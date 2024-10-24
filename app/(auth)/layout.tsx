"use client"
import './auth.scss'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="layoutContainer">
            {children}
        </section>
    )
}
