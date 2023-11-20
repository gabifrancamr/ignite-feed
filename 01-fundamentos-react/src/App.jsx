//componente é uma função que retorna algum HTML
import { Header } from "./components/Header";
import { Sidebar } from "./components/Siderbar";
import { Post } from "./components/Post";

import "./global.css";
import styles from "./App.module.css";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/gabifrancamr.png",
      name: "Gabriela França",
      role: "Web Delevoper",
    },
    content: [ 
      {type: 'paragraph', content:"Fala galeraa 👋" },
      {type: 'paragraph', content:"Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀" },
      {type: 'link', content:"jane.design/doctorcare", hashtags: ["#novoprojeto", "#NLW", "#RocketSeat"] },
    
    ],
    publishedAt: new Date('2023-11-14 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Mayk Brito",
      role: "Educator @Rocketseat",
    },
    content: [ 
      {type: 'paragraph', content:"Fala galera!" },
      {type: 'paragraph', content:"Acabei de subir mais um projeto no meu portifólio. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorNow 🚀" },
      {type: 'link', content:"lane.design/doctorNow" },
    
    ],
    publishedAt: new Date('2023-11-10 20:00:00')
  },
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <aside>
          <Sidebar />
        </aside>
        <main>
          {posts.map((post) => (
            <Post 
              key={post.id} 
              author={post.author}
              content={post.content}
              publishedAt = {post.publishedAt}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
