class DateParser{
    
    parseToDate(value){
        if(!value) return "";
        let arrayMonth = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre' ];
        let date = value.split(" ");
        let day = date[0];
        day = this.completeZeroLeft(day);
        
        let month = parseInt(arrayMonth.indexOf(date[1].split(",")[0]))+1;//por la coma :v
        month = this.completeZeroLeft(month)
        
        let year = date[2]
        // let time = new Date()
        // let hours = this.completeZeroLeft(time.getHours());
        // let minutes = this.completeZeroLeft(time.getMinutes());
        // let seconds = this.completeZeroLeft(time.getSeconds());
        let time_stamp = `${year}-${month}-${day}`// mi formateo :'v
        // let time_stamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000000`// mi formateo :'v
        //2018-06-11 17:46:13.872289
        return time_stamp;
    }
    completeZeroLeft(number){
        return (number+"").length==2?number: "0"+number
    }
    static parseToString(time_stamp){
        //2018-06-11 17:46:13.872289
        let arrayMonth = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre' ];
        
        let date = time_stamp.split("-")
        let day = parseInt(date[2])
        let month = arrayMonth[parseInt(date[1])-1]
        let year = date[0]

        let value = `${day} ${month}, ${year}`// mi formateo :'v
        return value;
        // 13 Junio, 2018
    }

}
export default DateParser;