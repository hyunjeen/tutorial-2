const searchForm = document.querySelector('#search-form');
const ulElement = document.querySelector('#image-list');
const resetbtn = document.querySelector('#reset')

searchForm.addEventListener('submit', async (e)=> {
  e.preventDefault();
  ulElement.textContent = ''
  const searchTerm = searchForm.elements.query.value;
  const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)

  const images = res.data.map((e)=> {  
    const newitem = []  
    newitem.push(e.show.name)
    newitem.push(e.show.image?.medium)
    return newitem
  })
  
  const imagefilter = images.filter((e)=> {
    return e.includes(undefined) !== true
  })
 

  const fragment = document.createDocumentFragment();

  imagefilter.forEach((e) => {  
    const liElement = document.createElement('li')
    const imgElement = document.createElement('img')
    const pElement = document.createElement('p')
    imgElement.setAttribute('src', e[1]) 
    pElement.innerText = e[0]   
    liElement.append(imgElement)
    liElement.append(pElement)
    fragment.append(liElement)
  })  
  ulElement.append(fragment)
})

