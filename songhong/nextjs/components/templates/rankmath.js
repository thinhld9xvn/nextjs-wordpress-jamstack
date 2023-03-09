import React from 'preact/compat';
import Head from "next/head";

export default function RankMath({ data }) {
    return (
        <Head>
            {data.map((meta) => {               
                if ( meta.type === 'meta' ) {
                    if (meta.name) {
                        return (
                            <meta key={meta.name} name={meta.name} content={meta.content} />
                        )
                    }
                    if (meta.property) {
                        return (
                            <meta key={meta.property} property={meta.property} content={meta.content} />
                        )
                    }
                }
                if (meta.type === 'title') {
                    return (
                        <title key={meta.name}>
                            {meta.content}
                        </title>
                    )
                }
                return null;
            }).filter(meta => meta !== null)}
        </Head>
    );
};
