import { useState } from "react";
import * as React from "react";
import styled from "styled-components";
import "csshake";
import { gitmojis } from "gitmojis";

import useGitmojiQuiz from "./useGitmojiQuiz";
import MinimalEmojiCard from "./MinimalEmojiCard";
import QuestionBar from "./QuestionBar";

const HardQuiz: React.FC = () => {
  const { currentQuestion, setNewQuestion } = useGitmojiQuiz();
  const [shake, setShake] = useState<string | null>(null);

  if (!currentQuestion) {
    return null;
  }

  return (
    <Layout>
      <QuestionBar
        emoji={currentQuestion}
        setShake={setShake}
      />
      <HardGrid>
        {gitmojis.map((emoji) => (
          <MinimalEmojiCard
            emojiData={emoji}
            key={emoji.code}
            className={shake === emoji.name ? "shake shake-constant" : ""}
            onClick={async () => {
              if (emoji.name === currentQuestion.name) {
                return setNewQuestion();
              }
              setShake(emoji.name);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              setShake(null);
            }}
          />
        ))}
      </HardGrid>
    </Layout>
  );
};

const Layout = styled.div`
  min-height: 100vh;
  background-color: #eee;
`;

const Grid = styled.div`
  flex-grow: 1;
  padding: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const HardGrid = styled(Grid)`
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  @media screen and (max-width: 1000px) and (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  @media screen and (max-width: 900px) and (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  @media screen and (max-width: 800px) and (min-width: 700px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  @media screen and (max-width: 700px) and (min-width: 500px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media screen and (max-width: 300px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default HardQuiz;
