jQuery(document).ready(function($){
    console.log(new Date().getFullYear(),new Date().getMonth()+1)

    const monthNames = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
    var currentYear = new Date().getFullYear();

    function isLeapYear(year) {
        if(year === undefined) {
            var year = new Date().getFullYear();
        }
        var year = Math.abs(year);
        if(year%896 === 0){
            return false;
        }
        switch(year%28){
            case 0:
            case 5:
            case 11:
            case 16:
            case 22:
                return true;
            default:
                return false;
        }
    }

    function isMonth35(month,year) {
        if(month === undefined) {
            var month = new Date().getMonth();
        }
        if(year === undefined) {
            var year = new Date().getFullYear();
        }
        var month = (Math.abs(month)-1) % 12;
        var year = Math.abs(year);
        if(isLeapYear(year)) {
            if(month === 11) {
                return true;
            }
        }
        if(month%3 === 1){
            return true;
        }
        return false;
    }

    function getMonthDayNumber(month,year) {
        return isMonth35(month,year)?35:28;
    }

    function drawMonthTable(month,year) {
        var daysInMonth = getMonthDayNumber(month,year);
        var ires = '';
        var kres = '';
        var quarterDays = 0;
        switch((month-1)%3){
            case 0:
                quarterDays = 0;
            break;
            case 1:
                quarterDays = 28;
            break;
            case 2:
                quarterDays = 35+28;
            break;
        }
        var zaza = ( ((((month-1)-((month-1)%3)) / 3)*91) + quarterDays );
        for(var i = 0; i < daysInMonth/7; i++){
            for(var k = 1; k <= 7; k++){
                kres += '<div id="' + (zaza+(k+(i*7))) + '" '+(k==6||k==7?'class="weekend"':'')+'>'+(k+(i*7))+'</div>';
            }
            ires +='<div class="week">'+kres+'</div>';
            kres = '';
        }
        return '<div id="'+ month +'" data-days="'+ zaza +'" class="month">'+ires+'</div>';
    }

    function drawYearTable(year) {
        if(year === undefined) {
            var year = new Date().getFullYear();
        }
        var year = Math.abs(year);
        var ires = '';
        var kres = '';
        for(var i = 0; i < 4; i++){
            for(var k = 1; k <= 3; k++){
                kres += '<div class="'+(monthNames[(k-1)+(i*3)])+'"><span>'+(monthNames[(k-1)+(i*3)])+'</span>'+(drawMonthTable((k+(i*3)),year))+'</div>';
            }
            ires +='<div>'+kres+'</div>';
            kres = '';
        }
        return '<span>'+year+'</span><div class="year">'+ires+'</div>';
    }

    $('#calendar').html(drawYearTable());

    $('#prev').on('click',function(e){
        $('#calendar').html(drawYearTable(--currentYear));
    });

    $('#next').on('click',function(e){
        $('#calendar').html(drawYearTable(++currentYear));
    });
});