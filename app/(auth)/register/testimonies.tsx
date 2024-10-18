'use client'

import './register.scss'

import Image from "next/image"
import { useState } from "react";

export default function Testimonies() {
    const [stop, setStop] = useState(false);

    const dataOdd = [
        {
            id: 1,
            name: 'Martha Maldonado',
            message: '“A game-changer for our project with their proactive approach and expert insights.”',
            image: 'https://us.123rf.com/450wm/vadymvdrobot/vadymvdrobot1809/vadymvdrobot180904459/108838207-image-of-young-beautiful-african-woman-student-walking-in-the-park-holding-laptop-computer.jpg?ver=6',
        },
        {
            id: 2,
            name: 'Connie Ndaba',
            message: '“Exceeded expectations with exceptional results and dedication.”',
            image: 'https://us.123rf.com/450wm/milkos/milkos1902/milkos190200759/117625825-happy-afro-american-student-girl-with-backpack-holding-books-on-university-background-student-loans.jpg?ver=6',
        },
        {
            id: 3,
            name: 'Bonolo Mokoena',
            message: '“Remarkable team with significant impact and attention to detail.”',
            image: 'https://us.123rf.com/450wm/leaf/leaf1401/leaf140100481/25580056-portrait-of-happy-male-student-with-books-standing-in-bookstore.jpg?ver=6',
        },
        {
            id: 4,
            name: 'Brandon Moagi',
            message: '“Exceptional service and high professionalism.”',
            image: 'https://t3.ftcdn.net/jpg/00/77/71/12/360_F_77711294_BA5QTjtgGPmLKCXGdtbAgZciL4kEwCnx.jpg',
        },
        {
            id: 5,
            name: 'Michael Brown',
            message: '“Exceeded expectations with innovative solutions and dedication.”',
            image: 'https://media.istockphoto.com/id/597958694/photo/young-adult-male-student-in-the-lobby-of-a-university.jpg?s=612x612&w=0&k=20&c=QaNEzmcKrLJzmwOcu2lgwm1B7rm3Ouq2McYYdmoMGpU=',
        },
        {
            id: 6,
            name: 'James Mqhayi',
            message: '“Outstanding results with expert commitment.”',
            image: 'https://t3.ftcdn.net/jpg/05/60/00/24/360_F_560002450_oxu1G9y76P4vVPNugw0KMOrYi954v6XL.jpg',
        },
        {
            id: 7,
            name: 'Kevin Mashile',
            message: '“Innovative approach and excellent results. Highly recommended.”',
            image: 'https://img.freepik.com/free-photo/portrait-handsome-man_23-2150770967.jpg',
        },
        {
            id: 8,
            name: 'Lebogang Malope',
            message: '“Top-notch results from true professionals.”',
            image: 'https://img.freepik.com/premium-photo/intelligent-young-american_1078797-31541.jpg',
        },
        {
            id: 9,
            name: 'David Martin',
            message: '“Transformative experience with outstanding results. Highly recommended.”',
            image: 'https://img.freepik.com/free-photo/portrait-handsome-man_23-2150770965.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1724025600&semt=ais_hybrid',
        },
    ]


    return (
        <div className="h-100 overflow-hidden p-2 testimonies" >
        <div className="wrapper">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="section-title text-center mb--10">
                    <span className="subtitle bg-primary-opacity">
                    {process.env.NEXT_PUBLIC_SITENAME ?? "EDUCATION FOR EVERYONE"}
                    </span>
                    <h4 className="title">
                    {process.env.NEXT_PUBLIC_SITETAGLINE ?? "People are supercharging their learning!"}
                    </h4>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="scroll-animation-wrapper no-overlay mt--50 cards-wrapper">
            <div className={`scroll-animation ${stop ? '' : 'scroll-right-left'}`}>
                {dataOdd.map((item) => (
                <div className="single-column-20 w-20 bg-odd" id="testimonie-card" key={item.id}>
                    
                    <div className="rbt-testimonial-box style-2">
                    <div className="inner">
                        <div className="icons">
                        </div>
                        <div className="description">
                        <p className="subtitle-3">
                            {item.message}
                        </p>
                        <div className="clint-info-wrapper">
                            <div className="thumb">
                            <Image
                                alt="Clint Images"
                                loading="lazy"
                                width={494}
                                height={494}
                                decoding="async"
                                data-nimg={1}
                                style={{ color: "transparent" }}
                                src={item.image}
                            />
                            </div>
                            <div className="client-info">
                            <h5 className="title">
                                {item.name}
                            </h5>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        <div className="scroll-animation-wrapper no-overlay mt--30 cards-wrapper">
            <div className={`scroll-animation ${stop ? '' : 'scroll-left-right'}`}>
            {dataOdd.map((item) => (
            <div className="single-column-20 bg-even" key={item.id}>
                <div className="rbt-testimonial-box style-2">
                <div className="inner">
                    <div className="description">
                    <p className="subtitle-3">
                        {item.message}
                    </p>
                    <div className="clint-info-wrapper">
                        <div className="thumb">
                        <img
                            alt="Clint Images"
                            loading="lazy"
                            width={494}
                            height={494}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src={item.image}
                        />
                        </div>
                        <div className="client-info">
                        <h5 className="title">
                            {item.name}
                        </h5>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>))}
            </div>
            
        </div>
        <button type="button" className="btn btn-light mt-3 flex justify-center items-center" onClick={() => setStop(!stop)}>
            <i className="bi bi-stop-circle" style={{fontSize:'1.3rem'}}></i>
        </button>
        </div>
    )
}
