// const baseUrl = 'http://localhost:5000'
const baseUrl = 'https://fees-collection-backend.onrender.com'



const Endpoints = {
    getDashboardData : `${baseUrl}/dashboardData`,
    changeStatus:`${baseUrl}/payment/status`,
    adminLogin:`${baseUrl}/admin/login`,
    studentLogin:`${baseUrl}/student/login`,
    studentpayment:`${baseUrl}/student/payment`,
    studentRegistration:`${baseUrl}/addstudent`,
    getCsvData:`${baseUrl}/collect_requests`,
}

export default Endpoints