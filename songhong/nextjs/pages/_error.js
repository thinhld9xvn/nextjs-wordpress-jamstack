import { useRouter } from "next/router"
import {useEffect} from 'preact/compat'
export default function Page() {
    const router = useRouter();
    useEffect(() => {
        setTimeout(function() {
            window.location.href = '/';
        }, 1000);
    }, []);
    return (
        <main id="main">
            <div className="error-section" style={{
                padding: "40px 0",
                textAlign: "center"
            }}>
                <div className="container">
                    Trang không tồn tại, đang redirect lại về trang chủ ...
                </div>
            </div>
        </main>
    );
}
export async function getServerSideProps(ctx) {
    return {
      props: {
      }
    }
}