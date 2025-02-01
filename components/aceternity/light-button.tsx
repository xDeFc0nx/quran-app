import Link from 'next/link'
import React from 'react'

type btn = {
    content: string;
    href: string;
}

const LightButton = ({content, href}: btn) => {
    return (
        <Link
            href={href}
            className="inline-flex h-12 z-10 animate-shimmer items-center justify-center rounded-md border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-xl text-slate-400 transition-colors hover:border-2 focus:outline-none focus:ring-0 focus:ring-slate-50 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
            {content}
        </Link>
    )
}

export default LightButton