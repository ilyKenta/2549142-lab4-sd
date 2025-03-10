const myButton = document.getElementById('countryButton');
myButton.addEventListener('click', addData);
const textField = document.getElementById("countInp")

function addData()
{
    document.getElementById("country-info").innerHTML = "";
    document.getElementById("bordering-countries").innerHTML = "";

    
    async function getData() {
        const textField = document.getElementById("countInp")
        if(typeof textField.value == "string")
        {
            const url = `https://restcountries.com/v3.1/name/${textField.value}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
      
          const json = await response.json();
          const countSec = document.getElementById("country-info");
          const newList = document.createElement('ul')
          const newCapEl = document.createElement('li')
          const newPopEl = document.createElement('li')
          const newRegEl = document.createElement('li')
          const newFlagEl = document.createElement('li')
          const newFlagIm = document.createElement('img')
          newCapEl.append('Capital: ' + json[0].capital[0])
          newPopEl.append('Population: ' + json[0].population)
          newRegEl.append('Region: ' + json[0].region)
          newFlagIm.src = json[0].flags.png
          newFlagEl.append("Flag: \n")
          //newFlagEl.append(newFlagIm)
          newList.append(newCapEl)
          newList.append(newPopEl)
          newList.append(newRegEl)
          newList.append(newFlagEl)
          newList.append(newFlagIm)
          countSec.append(newList)


          const bordering = document.getElementById("bordering-countries");
          const newBordList = document.createElement('ul');
          const newBorderingEl = document.createElement('ul')
          newBordList.append('Bordering Countries:')
          newBordList.append(newBorderingEl)

          bordering.append(newBordList)


          if(json[0].borders != undefined)
          {
            const bordArr = [];
            for(let i = 0; i < json[0].borders.length; i++)
            {
              const url = `https://restcountries.com/v3.1/alpha/${json[0].borders[i]}`;
              try {
                const response = await fetch(url);
                if (!response.ok) {
                  throw new Error(`Response status: ${response.status}`);
                }
            
                const borderjson = await response.json();
                bordArr.push(borderjson)
  
              } catch (error) {
                console.error(error.message);
              }
  
            }
  
  
            for(let i = 0; i < bordArr.length; i++)
            {
              const bordFlag = document.createElement('img')
              const bordFlagEl = document.createElement('li')
              bordFlag.src = bordArr[i][0].flags.png
              bordFlagEl.append(bordArr[i][0].cioc + ": ")
              bordFlagEl.append(bordFlag)
              newBorderingEl.append(bordFlagEl)
              newBorderingEl.append(bordFlag)
  
            }

          }
          else
          {
            newBordList.append("No bordering countries")
          }

          

          
          
          
        
            } catch (error) {
                alert("No such country")
            console.error(error.message);
            }
            
        }
        else
        {
            alert("No such country");
        }
        
      }
    
    getData();

}