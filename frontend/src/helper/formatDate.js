export function formatMongoDate(dateString) {
        var created_date = new Date(dateString)

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var year = created_date.getFullYear()
        var month = months[created_date.getMonth()]
        var date = created_date.getDate()
        var hour = created_date.getHours()
        var min = created_date.getMinutes()
        var sec = created_date.getSeconds()
        var updatedDate = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec // final date with time, you can use this according your requirement
      
        return updatedDate   
  }
  