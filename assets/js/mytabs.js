(function( $ ) {

    $.fn.myTabs = function( link ) {
        /*
        * @param link is the page link that you want to use the plugin on it...
        *
        * this.container :- the id attribute of the jQuery object where we
        * called myTabs() -- Ex: $('myTabs_container').myTabs( link );
        *
        * this.contents :- the class attribute of the jQuery object(s) where
        * we will display the contents of the tabs
        *
        * this.switches :- the class attribute of the jQuery ojbject(s) that
        * is going to be used as tabs (switches or buttons) to switch between
        * the tabs
        *
        * this.defaultSwitch :- the defaultSwitch active switch which is going
        * to be shown when the page loads.
        *
        */
        this.container = this.id;
        this.contents = '.myTabs_contents';
        this.swiches = 'myTabs_switch';
        this.defaultSwitch = '.myTabs_switch.default';

        this.init = function() {
            jQuery.prototype.activate = function() {
                // this function will add the class 'active' to both the switch
                // and the associated contents with it.
                if (this.length == 1) {
                    this.addClass('active');
                    var associ = getContentBySwitch(this);
                    associ.addClass('active');
                }
            }

            jQuery.prototype.deactivate = function() {
                // this function will remove the class 'active' from both the switch
                // and the associated contents with it.
                if (this.length == 1) {
                    this.removeClass('active');
                    var associ = getContentBySwitch(this);
                    associ.removeClass('active');
                }
            }

            var myTabs_container = $( this.container );
            var myTabs_contents = $( this.contents );
            var myTabs_swiches = $( this.swiches );
            var myTabs_defaultSwitch = $( this.defaultSwitch );
            var myTabs_defaultContent = getContentBySwitch( myTabs_defaultSwitch );

            changeActiveTab();

            function getContentBySwitch(myTabs_switch) {
                // myTabs_switch is a jQuery element or element-selector
                // @return associated content element with the switch
                if (myTabs_switch.length < 1) {
                    // check if the switch selector have one element selected
                    console.log('myTabs: Sorry, You should only select one element');
                    return;
                } else if (myTabs_switch.length > 1) {
                    // if more that one element selected, select the first one.
                    console.log('myTabs: Your selector targets more than one element, The first element only used!');
                    myTabs_switch = myTabs_switch[0];
                }
                var myTabs_switch_data = myTabs_switch.data('switch');
                var associ_content = $('*[data-contents="' + myTabs_switch_data + '"]');
                return associ_content;
            }

            function getSwitchByHash(hash) {

                /*
                 * @param string hash
                 *
                 * */
                hash = hash.replace(/[^a-zA-Z]/g, '');

                var myTabs_switch = $('[data-switch="' + hash + '"]');
                if (myTabs_switch.length > 0) {
                    return myTabs_switch;
                }
                return false
            }

            function changeActiveTab() {
                var hash = window.location.hash.replace(/[^a-zA-Z]/g, '');
                var activeSwitch = $('.myTabs_switch.active');

                // if there is an active switch (a switch with the class
                // active then deactivate the default switch and make
                // this switch active
                if (activeSwitch.length < 1) {
                    if (getSwitchByHash(hash)) {
                        myTabs_defaultSwitch.deactivate();
                        var nextSwitch = getSwitchByHash(hash);
                        nextSwitch.activate();
                    } else {
                        myTabs_defaultSwitch.activate();
                        window.location.hash = myTabs_defaultSwitch.data('switch');
                    }
                } else if (activeSwitch.length > 0 && getSwitchByHash(hash)) {
                    activeSwitch.deactivate();
                    var nextSwitch = getSwitchByHash(hash);
                    nextSwitch.activate();
                }
                return;
            }

            $(window).on('hashchange', changeActiveTab);

            // init() function
        }


        if (window.location.pathname.toString().match(link) != null )
             return this.init();
    }

}) ( jQuery );
