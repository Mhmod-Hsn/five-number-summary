'use strict;';
/* jshint node: true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */
$(document).ready(function () {



    console.log("ready!");

    $('#reset').on('click', function () {
        $('.form-control').val('');

        //		hide results
        $('.results').addClass('hidden');
        $('#myProgress').addClass('hidden');
    });

    $("#result").on("click", function () {


        $input = $('#input').val();
        $input = $input.split(',').map(function (item) {
            return parseInt(item, 10);
        });

        var NaNflag = false;

        for (var i = 0; i < $input.length; i++) {
            if (isNaN($input[i]) == true) {
                console.log('not a number');
                NaNflag = true;
            }
        }
        if (NaNflag == false) {
            $('.results').addClass('hidden');
            document.getElementById("myBar").innerHTML = 'Working';
            $('#myProgress').removeClass('hidden');

            //move();
            setTimeout(function () {
                document.getElementById("myBar").innerHTML = 'Done Processing ^_^';

                //		mean
                $('#mean').val(get_mean($input));

                //		Median
                $('#median').val(get_median($input));


                //		Mode
                $('#mode').val(get_mode($input));



                //		Variance		
                $('#variance').val(get_variance($input));



                //		Standard Diviation		
                $('#standard_diviation').val(get_standard_diviation($input));


                //		min
                $('#min').val(get_min($input));



                //		q2
                $('#q2').val(get_median($input));


                //		q1
                $('#q1').val(get_q1($input));


                //		q3
                $('#q3').val(get_q3($input));


                //		max
                $('#max').val(get_max($input));

                //		show results
                $('.results').removeClass('hidden');
            }, 4000);


        } else {
            $('.modal').modal('show');
            $('.results').addClass('hidden');
            $('#myProgress').addClass('hidden');
            document.getElementById("myBar").innerHTML = 'Working';
        }

    });
});


function get_mean($input) {
    console.log('get mean function');
    var mean = 0;
    var sum = 0;
    for (var i = 0; i < $input.length; i++) {
        sum += $input[i];
    }
    mean = sum / $input.length;
    return mean;
}

function get_median($input) {
    console.log('get median function');
    $input.sort(function (a, b) {
        return a - b;
    });

    var half = Math.floor($input.length / 2);

    if ($input.length % 2)
        return $input[half];
    else
        return ($input[half - 1] + $input[half]) / 2.0;
}

function get_mode($input) {
    'use stirct';
    console.log('get mode function');
    return $input.reduce(function (current, item) {
        var val = current.numMapping[item] = (current.numMapping[item] || 0) + 1;
        if (val > current.greatestFreq) {
            current.greatestFreq = val;
            current.mode = item;
        }
        return current;
    }, {
        mode: null,
        greatestFreq: -Infinity,
        numMapping: {}
    }, $input).mode;
}

function get_variance($input) {
    console.log('get variance function');
    var mean = $('#mean').val();
    var variance = 0;
    var sum = 0;
    for (var i = 0; i < $input.length; i++) {
        sum += ($input[i] - mean) * ($input[i] - mean);
    }
    variance = sum / $input.length;
    return variance;
}

function get_standard_diviation($input) {
    console.log('get standard_diviation function');
    var variance = $('#variance').val();
    var standard_diviation;
    standard_diviation = Math.sqrt(variance);

    return standard_diviation;
}

function get_min($input) {
    console.log('get min function');
    return Math.min.apply(null, $input);
}

function get_q1($input) {
    console.log('get q1 function');
    $input.sort(function (a, b) {
        return a - b;
    });

    var q1 = Math.floor($input.length / 4);

    if ($input.length % 2)
        return $input[q1];
    else
        return ($input[q1 - 1] + $input[q1]) / 2.0;
}

function get_q3($input) {
    console.log('get q3 function');
    $input.sort(function (a, b) {
        return a - b;
    });

    var q3 = Math.floor($input.length * 3 / 4);

    if ($input.length % 2)
        return $input[q3];
    else
        return ($input[q3 - 1] + $input[q3]) / 2.0;
}

function get_max($input) {
    console.log('get max function');
    return Math.max.apply(null, $input);
}


function move() {
    var elem = document.getElementById("myBar");
    var width = 10;
    var id = setInterval(frame, 40);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
            elem.innerHTML = 'Done Processing ^_^';
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1 + '%';
        }
    }
}
