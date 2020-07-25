jQuery(function($){

	if( $("input[type=file].with-preview").length ){
	    $("input.file-upload-input").MultiFile({
	        list: ".file-upload-previews"
	    });
	}

    $('.file-upload-previews').on('click','#removeAdImg', function(e) {
        // Keep  item click from being executed.
        e.stopPropagation();
        // Prevent navigating to '#'.
        e.preventDefault();
        // Ask user if he is sure.

        var id = $(this).data('item-id');
        var img = $(this).data('img-name');
        var action = 'removeAdImg';
        var $item = $(this).closest('.MultiFile-label');



        var delPrevImg = $('#deletePrevImg').val();
        if(delPrevImg != ""){
            $('#deletePrevImg').val(delPrevImg+','+img);
        }else{
            $('#deletePrevImg').val(img);
        }
        $('.file-upload').show();
        $item.remove();
    });
});


function addImage()
{
    var count = $('#imgCount').val();

    if(count < 5)
    {
        var newCount = ++count;
        $('#addInputFile').append('<div class="addmore-input" id="input-upload-img'+newCount+'"><input  name="img[]" class="file add-margin" data-preview-file-type="text" type="file" accept="image/*" onchange="checkFile(this)"><a class="pic-tage" href="javascript:void(0);" onclick="removeImg('+newCount+', this);"><i class="fa fa-times-circle" aria-hidden="true"></i></a></div>');
        $('#imgCount').val(newCount);
    }
    else
    {
        alert('You have reached your maximum limit.');
        $('#addMoreImg').hide();
    }
}

function removeImg(count, obj)
{
    $('#input-upload-img'+count).remove();
    obj.remove();
    if(count < 6)
    {
        $('#addMoreImg').show();
        var count = $('#imgCount').val();
        $('#imgCount').val(count-1);
    }

}