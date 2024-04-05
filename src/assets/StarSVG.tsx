import React from 'react';



export const HalfStarSVG: React.FC = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 fill-current" viewBox="0 0 24 24" {...props}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 17.27l-6.36 3.77 1.64-7.19-5.5-4.77 7.22-.62L12 2v15.27z" />
    </svg>
);




export const FullStarSVG: React.FC = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 fill-current" viewBox="0 0 24 24"  {...props}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 17.27l-6.36 3.77 1.64-7.19-5.5-4.77 7.22-.62L12 2l2.99 7.46 7.22.62-5.5 4.77 1.64 7.19L12 17.27z" />
    </svg>
);