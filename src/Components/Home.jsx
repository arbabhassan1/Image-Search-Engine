import React, { useState, useEffect } from 'react'
import Test from './Test';
import arrow from '../IMG/arrow.svg'
function Home() {


    useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);


    useEffect(() => {
        const keyDownHandler = event => {

            if (event.key === 'Enter') {
                event.preventDefault();

                flag();
            }
        };

        document.addEventListener('keydown', keyDownHandler);
    })


    const img_3 = 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

    const img_2 = 'https://images.unsplash.com/photo-1692981226516-f76bcc8945b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'

    const img_1 = 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'


    const accessKey = "PWEx3HApwHoQ4LJ5ZyA2x8CRT0c_iU-D2e0nShH1xG4";

    const loadMore = document.getElementById('show-more-btn');
    const search_results = document.querySelector('.search-results');
    const input_box = document.getElementById('input-field');






    var [page, setpage] = useState(1);
    var [inputData, setinputData] = useState('');

    async function searchImages() {

        if (inputData === '') {

            return;


        }
        console.log("passs");


        const url = `https://api.unsplash.com/search/photos/?page=${page}&query=${inputData}&client_id=${accessKey}`
        const response = await fetch(url)
        const data = await response.json()


        const results = data.results;

        if (page === 1) {
            search_results.innerHTML = '';
        }
        results.map((result) => {
            const image_cart = document.createElement('div');
            image_cart.classList.add('search-result');
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imagelink = document.createElement('a');
            imagelink.href = result.links.download;

            imagelink.target = '_blank';
            imagelink.textContent = result.alt_description;


            image_cart.appendChild(image);
            image_cart.appendChild(imagelink);
            search_results.appendChild(image_cart);






        });

        page++;

        if (page > 1) {
            loadMore.style.display = 'block';
        }




    }

    const topbar = document.getElementById('arrow');

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 100) {
            document.getElementById('arrow').style.opacity = "100%"

        } else {
            document.getElementById('arrow').style.opacity = "0%"
        }
    });

    const flag = () => {
        setpage(1);
        searchImages();


    }

    const handelchange = (event) => {
        console.log(event.target.value);
        setinputData(event.target.value);
    }






    return (








        <div className='flex items-center justify-center flex-col relative'>
            <img src={arrow} alt="" id="arrow" onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }} />
            <header className=' w-full h-[40vh] md:h-[50vh] bg-img text-white flex items-center justify-center flex-col gap-5'>

                <h1 className='text-[2em] font-bold'>Image Search Engine</h1>
                <div className='w-[80%] flex justify-center items-center' >
                    <input className='w-[100%] h-10 px-4 max-w-[420px] border-none text-lg text-black rounded-sm' type="text" placeholder="Search Image" id="input-field" onChange={handelchange} value={inputData} />
                    <button className='text-lg px-[10px] py-[6px] cursor-pointer bg-teal-600 border-none font-medium rounded-r hover:bg-teal-700' onClick={() => {
                        flag();
                    }}>Search</button>

                </div>

            </header>

            <div className="search-results flex justify-between flex-wrap max-w-[1200px] my-0 mx-auto pt-[40px] pb-0 px-[10%]">
                <div className="search-result mb-16 w-[30%] h-full rounded overflow-hidden shadow-sm">
                    <img className='w-full h-full object-cover ' src={img_1} alt="" />
                    <a className=' text-center block capitalize text-[17px] p-2' href={img_1}
                    >Nature
                        & Mountains</a>
                </div>
                <div className="search-result mb-16 w-[30%] h-full rounded overflow-hidden shadow-sm">
                    <img className='w-full h-full object-cover ' src={img_2}
                        alt="" />
                    <a className=' text-center block capitalize text-[17px] p-2' href={img_2}
                    >Animals</a>
                </div>
                <div className="search-result mb-16 w-[30%] h-full rounded overflow-hidden shadow-sm">
                    <img className='w-full h-full object-cover ' src={img_3}
                        alt="" />
                    <a className=' text-center block capitalize text-[17px] p-2' href={img_3} download={img_3}
                    >Fashion & Beauty</a>
                </div>
            </div>
            <button id="show-more-btn" onClick={() => {
                searchImages();
            }}>Load more</button>

            <div className="copyright w-full">
                <p>
                    A Project by <a href="https://arbabhassan.bio.link/" className='hover:text-teal-600' target="_blank">Arbab Hassan</a>
                </p>
            </div>


        </div>
    )
}

export default Home
