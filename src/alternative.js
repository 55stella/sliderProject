import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  const[people, setPeople]=useState(data)
  const[index, setIndex] =useState(0)

  const nextSlide =()=>{
      setIndex((oldindex)=>{
          let newIndex = oldindex + 1
          if(newIndex > people.length-1){
              newIndex =0
          }
          return newIndex
      })
  }
  const prevSlide =()=>{
      setIndex((oldindex)=>{
          let newIndex = oldindex - 1
          if(newIndex < 0){
              newIndex = people.length-1
          }
          return newIndex
      })
  }

//   useEffect(()=>{
//     const lastIndex = people.length-1
//     if(index < 0){
//       setIndex(lastIndex)
//     }
//     if(index > lastIndex){
//       setIndex(0)
//     }

//   },[index, people])
  // watch out for a change in index and people

  useEffect(()=>{
  let slider =setInterval(()=>{
    setIndex((oldindex)=>{
        let newIndex = oldindex - 1
        if(newIndex < 0){
            newIndex = people.length-1
        }
        return newIndex
    })
  

  }, 3000)
  return ()=>clearInterval(slider)
    
  },[index])

  
  return(
    <main>
      <div className='title'>
      <h2><span>/</span>Reviews</h2>
      </div>
      <div className='section-center'>
      
        {people.map((person, personIndex)=>{
          const{name, id, title, quote, image}=person 
  let position ='nextSlide'
  if(personIndex ===index){
    position = 'activeSlide'
  }if(personIndex ===index-1 || (index ===0 && personIndex===people.length-1)){
    position ='lastSlide'
    // if the index is less than 0,
  }
          return(
            <article key ={id} className={position}>
             <img src={image} alt={title}  className='person-img'/>
             <h4>{name}</h4>
             <p className='title'> {title}</p>
             <p className="text">{quote}</p>
             <FaQuoteRight className='icon'/>
            </article>
          )
        })}
         <button type ='button' className='prev' onClick={nextSlide}><FiChevronLeft/></button>
         <button type ='button' className='next' onClick={prevSlide}><FiChevronRight/></button>
      </div>

      
    </main>

  )


}

export default App;
