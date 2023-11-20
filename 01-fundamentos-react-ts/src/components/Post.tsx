import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

//estado = variáveis que eu quero que o componente monitore

interface Author {
  name: string,
  role: string,
  avatarUrl: string
}

interface Content {
  type: 'paragraph' | 'link';
  content: string
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[]
}

interface PostProps {
  post: PostType
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(["Post muito banaca, hein?"]);

  const [newCommentText, setNewCommentText] = useState("");

  const publisheDateFormated = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(ev: FormEvent) {
    ev.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange(ev: ChangeEvent<HTMLTextAreaElement>) {
    ev.target.setCustomValidity("")
    setNewCommentText(ev.target.value);
  }

  function handleNewCommentInvalid(ev: InvalidEvent<HTMLTextAreaElement>) {
    ev.target.setCustomValidity("Esse campo é obrigatório")
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter(comment  => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeleteOne)

  }

  const isNewCommitEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publisheDateFormated} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
              return <p key={line.content}><a href="#">{line.content}</a></p>
            }
          
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          value={newCommentText}
          onChange={handleNewCommentChange}
          placeholder="Deixe um comentário :)"
          onInvalid={handleNewCommentInvalid}
          required 
        />

        <footer>
          <button type="submit" disabled={isNewCommitEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment 
              key={comment} 
              content={comment}
              onDeleteComment={deleteComment}
              
            />
          )
        })}
      </div>
    </article>
  );
}
