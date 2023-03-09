import Image from 'next/image';
import React, {useEffect, useState} from 'preact/compat'

export default function Vision({ data }) {
    const [sizes, setSizes] = useState(null);
    const {background, content} = data[0];
    useEffect(() => {
        const myImage = document.createElement('img');
        myImage.src = background;
        myImage.onload = function() {
            setSizes({width: this.width, height: this.height});
        }
        myImage.onerror = function() {
        }
    }, [,data]);
  return (
    <section className="vision-abouts__pages mb-125s">
        <div className="container">
            {sizes ? (
                <div className="img-vision__abouts mb-50s">
                    <Image src={background} width={sizes.width} height={sizes.height} />
                </div>
            ) : null}
            <div dangerouslySetInnerHTML={{
                __html: content
            }}></div>
        </div>
    </section>
  )
}
