from rest_framework import serializers
from .models import LeaveTypeIndex, Company, LeavePolicy, LeavePolicyTypes, EmployeeLeavesRequests, Employee
from .models import Company

class CompanyMainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'company_name', 'company_gstno', 'createdby', 'created_at']

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'company', 'emp_code', 'date_of_birth', 'father_name', 'mother_name', 'phone_number', 'adhaar_number', 'user']
        
class LeaveTypeIndexSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveTypeIndex
        fields = ['id', 'leavename', 'leave_description', 'company']

class LeavePolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = LeavePolicy
        fields = ['id', 'carry_forward', 'company']

class LeavePolicyTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeavePolicyTypes
        fields = ['id', 'max_days', 'leave_policy', 'leave_type']

class EmployeeLeaveRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeLeavesRequests
        fields = ['id', 'employee', 'leave_type', 'start_date', 'end_date', 'leave_day_type', 'reporting_manager_email', 'reason_for_leave', 'status_of_leave']

    def create(self, validated_data):
        employee = validated_data.get('employee')
        # Fetch reporting manager's email from the employee's user data
        if employee.user.reporting_manager:
            validated_data['reporting_manager_email'] = employee.user.reporting_manager.email
        return super().create(validated_data)
