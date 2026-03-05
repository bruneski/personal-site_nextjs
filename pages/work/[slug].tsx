import { useRouter } from "next/router"; 

export default function ProjectPage() {

    const router = useRouter();

    const uri = router.query.slug;
    return(
        <>
            <h1>{uri}</h1>
        </>
    )
}