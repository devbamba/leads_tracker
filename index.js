
let myLeads = []
const inputEl = document.getElementById('input-el') 
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById('tab-btn')

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
})

})
    

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)

})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""

    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

function render(leads){
    let listItems = ''

    for(let i=0; i<leads.length; i++){

        listItems += `
                    <li>
                        <a href= '${leads[i]}' target='_blank'> 
                            ${leads[i]} 
                        </a>
                    </li>
                `
}
    ulEl.innerHTML = listItems 
}


function generateSentence(desc, arr){
    let descArr = `The best ${arr.length} ${desc} are `

    let arrIndex = arr.length -1
    for(i=0;i<arr.length;i++){
        if(i === arrIndex){
            descArr += arr[i]
        }else{
            descArr += arr[i] + " and "
        }
    }
    return descArr
}console.log(generateSentence("footbalers", ["Messi", "CR7"]))