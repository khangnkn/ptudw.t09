function submitComment(articleid, userid) {
    $.post("/article/comment", {
        Article: articleid,
        User: userid,
        Content: $('#txtComment').val(),
    }).done(response => {
        console.log(response)
        if (response.success == true) {
            location.reload()
        } else {
            alert("An error has occurred. Try again later!")
        }
    })
}