import React from "react"
import ContentLoader from "react-content-loader"

const Sceleton = () => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    
  >
    <circle cx="134" cy="134" r="125" /> 
    <rect x="0" y="294" rx="10" ry="0" width="280" height="21" /> 
    <rect x="0" y="341" rx="10" ry="0" width="280" height="90" /> 
    <rect x="0" y="451" rx="10" ry="95" width="96" height="32" /> 
    <rect x="125" y="446" rx="24" ry="24" width="151" height="43" />
  </ContentLoader>
)

export default Sceleton