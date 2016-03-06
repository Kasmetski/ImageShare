Session.set("imageLimit", 8);

lastScrollTop = 0;
$(window).scroll(function (event) {
    // test if we are near the bottom of the window
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        // where are we in the page?
        var scrollTop = $(this).scrollTop();
        // test if we are going down
        if (scrollTop > lastScrollTop) {
            // yes we are heading down...
            Session.set("imageLimit", Session.get("imageLimit") + 4);
        }
        lastScrollTop = scrollTop;
    }
});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
});


Template.body.helpers({
    username: function () {
        if (Meteor.user()) {
            return Meteor.user().username;
            //return Meteor.user().emails[0].address;
        }
        else {
            return "anonymous internet user";
        }
    }
});


Template.imageAddForm.events({
    'submit .js-add-image': function (event) {
        var img_src, img_alt;

        img_src = event.target.img_src.value;
        img_alt = event.target.img_alt.value;
        console.log("src: " + img_src + " alt:" + img_alt);
        if (Meteor.user()) {
            Images.insert({
                img_src: img_src,
                img_alt: img_alt,
                createdOn: new Date(),
                createdBy: Meteor.user()._id
            });
        }
        $("#image_add_form").modal('hide');

        return false;
    }
});