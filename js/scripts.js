function mascara(i){
   
    var v = i.value;
    
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
 
 } 


 function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
 
 function panico() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async function (position) {
            const lat = position.coords.latitude.toFixed(6);
            const lon = position.coords.longitude.toFixed(6);

            document.getElementById("latitude").value = lat;
            document.getElementById("longitude").value = lon;

            const endereco = await obterEndereco(lat, lon);
            document.getElementById("endereco").value = endereco;

            const mensagem = `🚨 *BOTÃO DE PÂNICO ACIONADO!* 🚨\n\n📍 *Localização:*\nLatitude: ${lat}\nLongitude: ${lon}\n📫 *Endereço:* ${endereco}\n\n🚌 Veículo em situação de emergência!\n🌍 [Ver no mapa](https://www.google.com/maps?q=${lat},${lon})`;

            enviarParaTelegram(mensagem);
          },
          function (error) {
            alert("Erro ao obter localização: " + error.message);
          }
        );
      } else {
        alert("Geolocalização não suportada pelo navegador.");
      }
    }

    async function obterEndereco(lat, lon) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
      try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados.display_name || "Endereço não encontrado";
      } catch (erro) {
        return "Erro ao obter endereço";
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      const panicButton = document.querySelector('.btn-panic');
    
      if (panicButton) {
        panicButton.addEventListener('click', () => {
          // Vibra por 200ms se o dispositivo suportar
          if (navigator.vibrate) {
            navigator.vibrate(2000);
          }
        });
      }
    });
    
    