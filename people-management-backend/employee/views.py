from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib import messages
from datetime import date
from .models import LeaveTypeIndex, Company, LeavePolicy, LeavePolicyTypes, EmployeeLeavesRequests, Employee
from .serializers import LeaveTypeIndexSerializer, LeavePolicySerializer, LeavePolicyTypesSerializer, EmployeeLeaveRequestSerializer, CompanyMainSerializer, EmployeeSerializer

#Adding a Company
class CompanyListCreateAPIView(APIView):
    def get(self, request):
        companies = Company.objects.all()
        serializer = CompanyMainSerializer(companies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def post(self, request):
        serializer = CompanyMainSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateEmployeeView(APIView):
    def post(self, request):
        # Serialize the incoming data
        serializer = EmployeeSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save the employee data if valid
            serializer.save()
            return Response({'message': 'Employee created successfully.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        
        # Return validation errors if the data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# LEAVE TYPE MANAGEMENT
# Creating a Leave type
class LeaveTypeCreateView(APIView):
    def post(self, request):
        serializer = LeaveTypeIndexSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Leave type created successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Displaying all the Leave types
class LeaveTypeListView(APIView):
    def get(self, request):
        leave_types = LeaveTypeIndex.objects.all()
        serializer = LeaveTypeIndexSerializer(leave_types, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Updating the Leave types
class LeaveTypeUpdateView(APIView):
    def put(self, request, pk):
        leave_type = get_object_or_404(LeaveTypeIndex, pk=pk)
        serializer = LeaveTypeIndexSerializer(leave_type, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Leave type updated successfully.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Deleting a Leave type
class LeaveTypeDeleteView(APIView):
    def delete(self, request, pk):
        leave_type = get_object_or_404(LeaveTypeIndex, pk=pk)
        if leave_type.employeeleavesrequests_set.exists():
            return Response({'message': 'This leave type cannot be deleted as it is associated with leave requests.'}, status=status.HTTP_400_BAD_REQUEST)
        leave_type.delete()
        return Response({'message': 'Leave type deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


# LEAVE POLICY MANAGEMENT

# Creating a Leave Policy
class LeavePolicyCreateView(APIView):
    def post(self, request):
        policy_data = request.data.get('policy')
        policy_type_data = request.data.get('policy_type')

        policy_serializer = LeavePolicySerializer(data=policy_data)
        
        if policy_serializer.is_valid():
            # Save the LeavePolicy instance
            policy = policy_serializer.save()
            policy_type_data['leave_policy'] = policy.id           
            # Serialize 
            policy_type_serializer = LeavePolicyTypesSerializer(data=policy_type_data)
            
            if policy_type_serializer.is_valid():
                policy_type_serializer.save()
                return Response({'message': 'Leave policy created successfully.'}, status=status.HTTP_201_CREATED)
            # Rollback policy
            policy.delete()
            return Response(policy_type_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(policy_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Displaying all the leave policies
class LeavePolicyListView(APIView):
    def get(self, request):
        policies = LeavePolicy.objects.all()
        policy_types = LeavePolicyTypes.objects.all()
        policies_serializer = LeavePolicySerializer(policies, many=True)
        policy_types_serializer = LeavePolicyTypesSerializer(policy_types, many=True)
        return Response({'policies': policies_serializer.data, 'policy_types': policy_types_serializer.data}, status=status.HTTP_200_OK)

# Updating the Leave Policies
class LeavePolicyUpdateView(APIView):
    def put(self, request, pk):
        policy = get_object_or_404(LeavePolicy, pk=pk)
        policy_type = get_object_or_404(LeavePolicyTypes, leave_policy=policy)
        policy_data = request.data.get('policy', {})
        policy_type_data = request.data.get('policy_type', {})

        policy_serializer = LeavePolicySerializer(policy, data=policy_data, partial=True)
        policy_type_serializer = LeavePolicyTypesSerializer(policy_type, data=policy_type_data, partial=True)

        if policy_serializer.is_valid() and policy_type_serializer.is_valid():
            policy_serializer.save()
            policy_type_serializer.save()
            return Response({'message': 'Leave policy updated successfully.'}, status=status.HTTP_200_OK)

        errors = {**policy_serializer.errors, **policy_type_serializer.errors}
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

# Deleting the Leave Policies
class LeavePolicyDeleteView(APIView):
    def delete(self, request, pk):
        policy = get_object_or_404(LeavePolicy, pk=pk)
        if policy.leavepolicytypes_set.exists():
            return Response({'message': 'This leave policy cannot be deleted as it is associated with leave requests.'}, status=status.HTTP_400_BAD_REQUEST)
        policy.delete()
        return Response({'message': 'Leave policy deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


# EMPLOYEE LEAVE BALANCE VIEWS
# View for the employee to see all his Leaves
class EmployeeLeaveBalanceView(APIView):
    def get(self, request):
        employee = request.user.employee  
        leave_balances = []
        leave_types = LeaveTypeIndex.objects.filter(company=employee.company)

        for leave_type in leave_types:
            try:
                max_days = LeavePolicyTypes.objects.get(leave_type=leave_type).max_days
            except LeavePolicyTypes.DoesNotExist:
                max_days = 0

            total_taken = EmployeeLeavesRequests.objects.filter(leave_type=leave_type, employee=employee, status_of_leave='Approved').count()
            remaining_balance = max_days - total_taken

            leave_balances.append({
                'leave_type': leave_type.leavename,
                'total_allocated': max_days,
                'total_taken': total_taken,
                'remaining_balance': remaining_balance
            })

        return Response(leave_balances, status=status.HTTP_200_OK)

# View for Admin to see all the employee leaves
class AdminLeaveBalancesView(APIView):
    def get(self, request):
        leave_balances = []
        employees = Employee.objects.all()

        for employee in employees:
            leave_types = LeaveTypeIndex.objects.filter(company=employee.company)
            for leave_type in leave_types:
                try:
                    max_days = LeavePolicyTypes.objects.get(leave_type=leave_type).max_days
                except LeavePolicyTypes.DoesNotExist:
                    max_days = 0

                total_taken = EmployeeLeavesRequests.objects.filter(leave_type=leave_type, employee=employee, status_of_leave='Approved').count()
                remaining_balance = max_days - total_taken

                leave_balances.append({
                    'employee_name': f"{employee.first_name} {employee.last_name}",
                    'employee_code': employee.emp_code,
                    'leave_type': leave_type.leavename,
                    'total_allocated': max_days,
                    'total_taken': total_taken,
                    'remaining_balance': remaining_balance
                })

        return Response(leave_balances, status=status.HTTP_200_OK)


# LEAVE REQUEST VIEWS
from rest_framework.exceptions import NotFound

class ApplyForLeaveView(APIView):
    def post(self, request):
        try:
            employee = request.user.employee  
            print("Employee instance:", employee) 
        except Employee.DoesNotExist:
            raise NotFound("The user does not have an associated Employee profile.")
        
        serializer = EmployeeLeaveRequestSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(employee=employee, status_of_leave='Pending')
            return Response({'message': 'Leave request submitted successfully.'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# View for Employee to see the leave his specifically
class EmployeeLeaveRequestsView(APIView):
    def get(self, request):
        leave_requests = EmployeeLeavesRequests.objects.filter(employee=request.user.employee)
        serializer = EmployeeLeaveRequestSerializer(leave_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# View for Admin to see the leaves of employees specifically
class AdminLeaveRequestsView(APIView):
    def get(self, request):
        leave_requests = EmployeeLeavesRequests.objects.all()
        serializer = EmployeeLeaveRequestSerializer(leave_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Admin views for all the Leave requests (ACCEPT/REJECT)
class ViewLeaveRequestView(APIView):
    def get(self, request, pk):
        leave_request = get_object_or_404(EmployeeLeavesRequests, pk=pk)
        serializer = EmployeeLeaveRequestSerializer(leave_request)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Admin can update the Leave requests update(ACCEPT/REJECT)
class UpdateLeaveRequestStatusView(APIView):
    def put(self, request, pk):
        leave_request = get_object_or_404(EmployeeLeavesRequests, pk=pk)
        new_status = request.data.get('status_of_leave')
        leave_request.status_of_leave = new_status
        leave_request.save()
        return Response({'message': 'Leave request status updated successfully.'}, status=status.HTTP_200_OK)
