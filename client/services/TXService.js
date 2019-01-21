import Api from '@/services/Api'

export default {
    tx (data) {
        return Api().post('tx', data)
    }
}