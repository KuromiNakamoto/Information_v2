/* 
    Code by Minato Nankaji
    Product : Info v2
    Contact : 
    - Facebook : https://www.facebook.com/Minato.Nankaji/
    - Discord : 港 なんかじ#0001
    Website : https://tokovn.com
*/

// change it to true if you have project find api
var projectfind = false;

// snowflake
var snowflake = true;

$(document).ready(() => {
    if (snowflake) {
        $('#loadSnow').html(`
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
        `);
    }
    
    $('.card-button-switch').click(function () {
        if (!$(this).hasClass('focused')) {
            let _load = $('#loading');

            let _this = $(this);
            let _target = $(_this.attr('data-target'));
            let _all = $('.card-button-switch');
            let _all_2 = $('.toggle-content');
            
            _load.addClass('focused');
            _all.removeClass('focused');
            _this.addClass('focused');
            _all_2.removeClass('focused');
            setTimeout(function () {
                _target.addClass('focused');
                _load.removeClass('focused');
            }, 400);
        }
    });

    $('#project_find').submit(function (e) {
        e.preventDefault();

        if (!projectfind) {
            swal('Tính năng này đang bảo trì !', 'error');
        } else {
            let project_id = $('#project_find_id').val();
            let default_txt = $('#project_find_submit').html().trim();

            $.ajax({
                type: "GET",
                url: "https://tokovn.com/api/project_find.php?id=" + project_id, // recode api or use example file
                dataType: 'json',
                beforeSend: () => {
                    $('#loading').addClass('focused');
                    $('#project_find_submit').prop('disabled', !0).html("Đang kiểm tra...");
                },
                complete: () => {
                    $('#loading').removeClass('focused');
                    $('#project_find_submit').prop('disabled', !1).html(default_txt);
                },
                success: (response) => {
                    if (response.status) {
                        if (response.is_exists) {
                            swal(`<strong>THÔNG TIN PROJECT ${project_id}</strong> <br> Tên : ${response.title}<br>Phiên bản : ${response.version}<br>Demo : <a href="${response.demo}" target="_blank">Nhấn vào đây</a>`, "success");
                        } else {
                            swal(response.return_msg, "warning");
                        }
                    } else {
                        swal("Đã xảy ra lỗi !", "error");
                    }
                },
                error: (error) => {
                    console.log(error);
                }
            });
        }
    });

});

const select = document.querySelector.bind(document);

const LOADING = {
    overlayElement: select('#loading'),
    
    start: function(){
        this.handleLoad();
    },
    
    // Function handle
    handleLoad: function(){
        let _this = this;
        let transition = 500;
        let ok = false;
        setTimeout(()=>{ok=!ok},1000);
        this.overlayElement.style.transition = `opacity ${transition}ms linear`;
        window.onload = ()=>{
            if(ok)
                hiddenOverlay();
            else
                setTimeout(hiddenOverlay,1000);
        }
        function hiddenOverlay(){
            _this.overlayElement.style.opacity = 0;
            setTimeout(()=>{
                _this.overlayElement.classList.remove('focused');
                _this.overlayElement.style.opacity = 1;
                _this.overlayElement.style.transition = ``;
            },transition);
        }
    }

}

LOADING.start();

function swal(text, icon) {
    Swal.fire({
        icon,
        title: "Thông báo",
        html: text,
        confirmButtonText: "Đóng",
        confirmButtonColor: "#3085d6",
    });
}