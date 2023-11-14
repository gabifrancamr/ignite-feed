//componente é uma função que retorna algum HTML

import { Post } from "./Post"
import { Header } from "./components/Header"

import './global.css'
import styles from './App.module.css'
import { Sidebar } from "./components/Siderbar"

export function App() {
  return (
    <div>
      <Header />
      
      <div className={styles.wrapper}>
        <aside>
          <Sidebar />
        </aside>
        <main>
          <Post 
            author="Diego Fernandes" 
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. At maxime numquam quisquam reprehenderit provident quasi sunt vel nisi dolorum laudantium, ex sapiente adipisci sed inventore a explicabo magnam aut officia?"
          />
          <Post
            author="Gabriela França"
            content="Aprendendo React com a RocketSeat"
          />
        </main>
      </div>
    </div>
  )
}

