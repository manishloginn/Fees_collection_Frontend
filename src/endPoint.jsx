const baseUrl = 'http://localhost:5000'

const Endpoints = {
    getDashboardData : `${baseUrl}/dashboardData`,
    changeStatus:`${baseUrl}/payment/status`,
    adminLogin:`${baseUrl}/admin/login`,
    studentLogin:`${baseUrl}/student/login`,
    studentpayment:`${baseUrl}/student/payment`,
}

export default Endpoints