

from django.urls import path
from .views import LeaveTypeCreateView, LeaveTypeListView, LeaveTypeUpdateView, LeaveTypeDeleteView, LeavePolicyCreateView, LeavePolicyListView, LeavePolicyUpdateView, LeavePolicyDeleteView, EmployeeLeaveBalanceView, AdminLeaveBalancesView, ApplyForLeaveView, EmployeeLeaveRequestsView, AdminLeaveRequestsView, ViewLeaveRequestView, UpdateLeaveRequestStatusView
from .views import CompanyListCreateAPIView, CreateEmployeeView

urlpatterns = [
    path('companies/', CompanyListCreateAPIView.as_view(), name='company_list_create'),
    ##My-company GET API

    path('employees/create/', CreateEmployeeView.as_view(), name='create_employee'),
    # Leave Type Management
    path('leave-types/', LeaveTypeListView.as_view(), name='list_leave_types'),
    path('leave-types/create/', LeaveTypeCreateView.as_view(), name='create_leave_type'),
    path('leave-types/<int:pk>/update/', LeaveTypeUpdateView.as_view(), name='update_leave_type'),
    path('leave-types/<int:pk>/delete/', LeaveTypeDeleteView.as_view(), name='delete_leave_type'),

    # Leave Policy Management
    path('leave-policies/', LeavePolicyListView.as_view(), name='list_leave_policies'),
    path('leave-policies/create/', LeavePolicyCreateView.as_view(), name='create_leave_policy'),
    path('leave-policies/<int:pk>/update/', LeavePolicyUpdateView.as_view(), name='update_leave_policy'),
    path('leave-policies/<int:pk>/delete/', LeavePolicyDeleteView.as_view(), name='delete_leave_policy'),

    # Employee Balance Views
    path('employee/leave-balance/', EmployeeLeaveBalanceView.as_view(), name='employee_leave_balance'),
    path('admin/leave-balances/', AdminLeaveBalancesView.as_view(), name='admin_leave_balances'),

    # Leave Request Management
    path('leave-requests/apply/', ApplyForLeaveView.as_view(), name='apply_for_leave'),
    path('leave-requests/', EmployeeLeaveRequestsView.as_view(), name='employee_leave_requests'),
    path('admin/leave-requests/', AdminLeaveRequestsView.as_view(), name='admin_leave_requests'),
    path('leave-requests/<int:pk>/', ViewLeaveRequestView.as_view(), name='view_leave_request'),
    path('leave-requests/<int:pk>/update-status/', UpdateLeaveRequestStatusView.as_view(), name='update_leave_request_status'),
]

