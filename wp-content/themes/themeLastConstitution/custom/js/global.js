
function move(id, id_partie) {
    var coo = id.className.split(' ')[0];
    $.ajax({url: '../../wp-content/plugins/game_plugin/process_general.php',
        type: 'post',
        data: {info: 'move', new_position: coo, id_partie: id_partie, php_function_file:"process_general.php"},
        success: function (output) {
            output = JSON.parse(output);

            if (output["id_partie"].trim() == "false") {
                $('#resultat').html("Pas assez de points d'action !");
            } else {
                $('#grille').load('?id=' + output["id_partie"] + ' #grille');
                $('#points_action').load('?id=' + output["id_partie"] + ' #points_action');
                $('#position').load('?id=' + output["id_partie"] + ' #position');
                $('#chat_ville').load('?id=' + output["id_partie"] + ' #chat_ville');
                $('#chat_case').load('?id=' + output["id_partie"] + ' #chat_case');
                event_game(id);
            }
            if(!output["looted"]){
                //console.log("premier");
                  $('#zone_joueur').html('');
                  $('#button_fouiller').prop('disabled', false);
            }else{
                //console.log("deuxieme");
                $('#zone_joueur').html('Zone LOOTé DEGAGE!');
                $('#button_fouiller').prop('disabled', true);
                
            }
            

        }
    });

}

function tour_suivant(id_partie) {
    $.ajax({url: '../../wp-content/plugins/game_plugin/process_general.php',
        type: 'post',
        data: {info: 'tour_suivant', id_partie: id_partie},
        success: function (output) {
            $('#resultat').html("action effectuée !!");
            $('#points_action').html(output);

        }
    });
}

function display_pseudo_oncell(id, id_partie) {
    var coo = id.className.split(' ')[0];
    $.ajax({url: '../../wp-content/plugins/game_plugin/process_general.php',
        type: 'post',
        data: {info: 'get_ids_from_cell', position: coo, id_partie: id_partie},
        success: function (output) {
            $('#zone_list_player').html(output);
        }
    });

}
$(document).ready(function () {
    name_cell();
});
$(document).ajaxComplete(function () {
    name_cell();
});

function name_cell() {
    $(".cellule").click(function () {
        var coo = this.className.split(' ')[0];
        $("#nom_position").html(coo);
    });

}
function show_menu(id_menu) {
    if (id_menu == "ville") {
        $("#ville").removeClass("hidden");
        $("#chat").addClass("hidden");
        $("#etat").addClass("hidden");
        $("#zone").addClass("hidden");
        $("#coffre").addClass("hidden");
    } else if (id_menu == "etat") {
        $("#etat").removeClass("hidden");
        $("#chat").addClass("hidden");
        $("#ville").addClass("hidden");
        $("#zone").addClass("hidden");
        $("#coffre").addClass("hidden");
    } else if (id_menu == "chat") {
        $("#chat").removeClass("hidden");
        $("#ville").addClass("hidden");
        $("#etat").addClass("hidden");
        $("#zone").addClass("hidden");
        $("#coffre").addClass("hidden");
    } else if (id_menu == "zone") {
        $("#zone").removeClass("hidden");
        $("#chat").addClass("hidden");
        $("#ville").addClass("hidden");
        $("#etat").addClass("hidden");
        $("#coffre").addClass("hidden");
    }else if (id_menu == "coffre") {
        $("#coffre").removeClass("hidden");
        $("#chat").addClass("hidden");
        $("#ville").addClass("hidden");
        $("#etat").addClass("hidden");
        $("#zone").addClass("hidden");
    }
}

function delete_partie(id_partie) {
    $.ajax({url: '../../wp-content/plugins/game_plugin/process_general.php',
        type: 'post',
        data: {info: 'delete_partie', id_partie: id_partie},
        success: function (output) {
            $('#resultat').html("action effectuée !!");
            $('#points_action').html(output);

        }
    });
}

function show_menu_chat(id_chat) {
    if (id_chat == "ville") {
        $("#bloc_chat_ville").removeClass("hidden");
        $("#bloc_chat_case").addClass("hidden");
        $('#switch_chat').html(': ville');
    } else if (id_chat == "case") {
        $("#bloc_chat_case").removeClass("hidden");
        $("#bloc_chat_ville").addClass("hidden");
        $('#switch_chat').html(': case');
    }
}


/*window.setInterval(function(){
    $.ajax({url: '../../wp-content/plugins/game_plugin/game_chat.php',
        type: 'post',
        data: {called_ajax_php: 'game_chat.php', php_function_file: 'load_chat', id_partie: location.search.substring(4), tag: 'ville'},
        success: function (output) {
        	if(output != "null")
        	{
        		output = JSON.parse(output);

                $('#chat_ville').html("");
                
                for (var i = 0, len = output.length; i < len; i++) {
                	//console.log(typeof output[i].heure);
                	$('#chat_ville').append(
                			"<div class='row'><div class='col-2'>[" 
                			+ output[i].heure 
                			+ "] </div><div class='col-2'>" 
                			+ output[i].id_joueur 
                			+ ": </div><div class='col-8'>" 
                			+ output[i].message 
                			+ "</div></div><hr/>");
                }
        	}
        }
    });
    
    $.ajax({url: '../../wp-content/plugins/game_plugin/game_chat.php',
        type: 'post',
        data: {called_ajax_php: 'game_chat.php', php_function_file: 'load_chat', id_partie: location.search.substring(4), tag: 'case'},
        success: function (output) {
        	if(output != "null")
        	{
                $('#chat_case').html(output);
        	}
        }
    });
}, 2500);
*/

window.setInterval(function(){
    $.ajax({url: '../../wp-content/plugins/game_plugin/game_chat.php',
        type: 'post',
        data: {called_ajax_php: 'game_chat.php', php_function_file: 'refresh_chat', id_partie: location.search.substring(4)},
        success: function (output) {
            //verifier que output n'est pas vide   --OK
            //verifier quel chat est concerné
            //ajouter le message
        	
        	if(output != "[]")
        	{
        		//console.log(output);
        		output = JSON.parse(output);
        		
                for (var i = 0, len = output.length; i < len; i++) {
                	if(output[i].tag == "ville")
	        		{
	        			console.log("ville : " + output);
	        			$('#chat_ville').append("<div class='row'><div class='col-3'>" + output[i].heure  + "</div><div class='col-2'>" + output[i].id_joueur + "</div><div class='col-7'>" + output[i].message + "</div></div><hr />");
	        		}
	        		else if(output[i].tag == "case")
	    			{
	        			console.log("case : " + output);
	        			$('#chat_case').append("<div class='row'><div class='col-3'>" + output[i].heure  + "</div><div class='col-2'>" + output[i].id_joueur + "</div><div class='col-7'>" + output[i].message + "</div></div><hr />");
	    			}
                }
        	}
        }
    });
}, 5000);

function send_message(tag)
{
	message="";
	if(tag == "ville")
	{
		message = $("#message_ville").val();
	}
	else if(tag == "case")
	{
		message = $("#message_case").val();
	}
	
	if(message != "")
	{
	    $.ajax({url: '../../wp-content/plugins/game_plugin/game_chat.php',
	        type: 'post',
	        data: {called_ajax_php: 'game_chat.php', php_function_file: 'send_message', id_partie: location.search.substring(4), tag: tag, message: message},
	        success: function (output) {
	        	$('#message_reponse').html(output);
	        }
	    });
	}
}
