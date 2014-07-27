 function showTheme(theme) {

            window.dials = [];




            $("#marquee").cDash({type:"marquee",  theme: theme, message: "I THINK that I shall never see A poem lovely as a tree. A tree whose hungry mouth is prest Against the sweet earth's flowing breast; A tree that looks at God all day, And lifts her leafy arms to pray; A tree that may in summer wear A nest of robins in her hair; Upon whose bosom snow has lain; Who intimately lives with rain. Poems are made by fools like me, But only God can make a tree.  Joyce Kilmer. (1886-1918)"});


            var size = theme.trim() == "metro" ? 60: 70;


            dials.push($("#dashboard").cDash({type: "slider",  orientation:"w", x:10, y:20, width:size+10, height:220, theme: theme, id:"dial1"}).data("dial1"));

            dials.push($("#dashboard").cDash({type: "slider", orientation:"n", x:100, y:20, width: 220, height:size, theme: theme, id:"dial2"}).data("dial2"));
            dials.push($("#dashboard").cDash({type: "slider", orientation:"s", x:100, y:100, width: 220, height:size, theme: theme, id:"dial3"}).data("dial3"));

            dials.push($("#dashboard").cDash({type: "slider", orientation:"e", x:340, y:20, width: size+10, height:220, theme: theme, id:"dial4"}).data("dial4"));

            dials.push($("#dashboard").cDash({type: "dial360", orientation:"s", x:430, y:20, width: 200, height:200, theme: theme, id:"dial5"}).data("dial5"));


            dials.push($("#dashboard").cDash({type: "dial180", orientation:"n", x:350, y:250, width: 200, height:200, theme: theme, id:"dial6"}).data("dial6"));
            dials.push($("#dashboard").cDash({type: "dial180", orientation:"s", x:550, y:250, width: 200, height:200, theme: theme, id:"dial6"}).data("dial6"));

            dials.push($("#dashboard").cDash({type: "dial180", orientation:"w", x:80, y:180, width: 133, height:200, theme: theme, id:"dial7"}).data("dial7"));
            dials.push($("#dashboard").cDash({type: "dial180", orientation:"e", x:215, y:180, width: 133, height:200, theme: theme, id:"dial8"}).data("dial8"));

        }

        $(function () {
            initializeThemeSelector();
            var firstLoad = (typeof window.location.search !== 'string' || window.location.search === "")            
            var theme = !firstLoad ? window.location.search.replace("?theme=","") : "metro";
            $("#themeSelector").val(theme);
            showTheme(theme + " ");
            $("#themeSelector").change(function () {
                window.location.search = "?theme="+$(this).val();
            });

            if (!firstLoad){
                  $('html, body').animate({
                    scrollTop: $("#dashboard").offset().top
                }, 2000);
            }

            animate();
            window.setInterval(animate, 2000)
        });


        function animate() {
            for (var i=0; i<window.dials.length; i++){
                window.dials[i].value(Math.random()*100);
            }
        }

        function initializeThemeSelector() {
            for (var i in DbDashboards.Dials.DialBase.themes) {
                $('<option value="'+i+'"> '+i+' </option>').appendTo($("#themeSelector"));
            }
        }