import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { useState } from "react";

//estado = variávis que eu quero que o componente monitore

export function Post({ author, content, publishedAt }) {
  const [comments, setComments] = useState(["Post muito banaca, hein?"]);

  const [newCommentText, setNewCommentText] = useState("");

  const publisheDateFormated = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(ev) {
    ev.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange() {
    event.target.setCustomValidity("")
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity("Esse campo é obrigatório")
  }

  function deleteComment(commentToDelete) {
    const commentsWithoutDeleteOne = comments.filter(comment  => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeleteOne)

    /*setComments(currentState => {
      const updatedComments = currentState.filter((item) => item !== comment)
      return updatedComments
    })*/
  }

  const isNewCommitEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publisheDateFormated} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
              return <p key={line.content}><a href="#">{line.content}</a></p>
            }
            {/*return (
              <>
                <p key={line.content}>
                  <a href="#">{line.content}</a>
                </p>

                {line.hashtags && line.hashtags.length > 0 && (
                  <p key={line.content}>
                    {line.hashtags.map((hashtag, index) => (
                      <a key={index} className={index === 1 ? "second-link" : ""} href="">
                        {hashtag}
                      </a>
                    ))}
                  </p>
                    )}
              </>
            );*/}
          
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
