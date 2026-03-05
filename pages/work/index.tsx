import type { GetServerSideProps } from "next";
import clientPromise from "../../middleware/database";

export type Project = {
  _id: string;
  name: string;
  category: string;
  subtitle?: string;
  thumbnail?: string;
  uri: string;
};

type WorkProps = {
  projects: Project[];
  error?: string;
};

const Work = ({ projects, error }: WorkProps) => {
    // Fallback to empty array if no projects from DB
    const projectList = (projects || []).map((el, index) => {
        return (
            //<Project key={el._id ?? index} project={el}/>
            //TODO: Add URI for the link
            <a key={el._id ?? index} href={`/work/${el.uri}`} className="bg-amber-200 h-40">
                <h3>{el.name}</h3>
                <h5>{el.subtitle}</h5>
            </a>
        )
    })

    
    return (
        <>
            {error && (
                <div className="container flex p-4">
                    <div className="bg-amber-100 border border-amber-400 text-amber-700 px-4 py-3 rounded">
                        {error}
                    </div>
                </div>
            )}
            <div className="container flex">
                    <div className="bg-backdrop w-full p-5 lg:p-20 m-auto">
                        <h1 className="black">Work</h1>
                        <div className="grid grid-col-fr gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                            {projectList}
                        </div>
                    </div>
                </div>
            {/* <div className="container flex">
                    <div className="bg-backdrop w-full p-5 lg:p-20 m-auto">
                        <h1 className="black">Work</h1>
                        <div className="flex flex-row flex-wrap gap-10 justify-center">
                            {projectList}
                        </div>
                    </div>
                </div> */}
            
        </>
    )
}

export const getServerSideProps: GetServerSideProps<WorkProps> = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("MBPDB");
    
    const projects = await db.collection("projects")
      .find({})
      .toArray() as Project[];

    // Serialize MongoDB _id for client
    // Serializing project: {
    //   _id: new ObjectId('691e786b9db399d97f1efa53'),
    //   name: 'Another TEST',
    //   category: 'Website',
    //   subtitle: '',
    //   thumbnail: ''
    // }
    const serializedProjects = projects.map((p) => (
      {
      ...p,
      _id: p._id?.toString(),
    }));

    return {
      props: {
        projects: JSON.parse(JSON.stringify(serializedProjects)),
      },
    };
  } catch (e) {
    console.error("MongoDB connection error:", e);
    return {
      props: {
        projects: [],
        error: "Failed to load projects",
      },
    };
  }
};

export default Work;