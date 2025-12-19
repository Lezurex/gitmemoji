import { useState } from "react";
import * as React from "react";
import styled from "styled-components";
import "csshake";

import EmojiCard from "./EmojiCard";
import useGitmojiQuiz from "./useGitmojiQuiz";
import QuestionBar from "./QuestionBar";

const EasyQuiz: React.FC = () => {
  const { currentQuestion, choices, setNewQuestion } = useGitmojiQuiz();
  const [shake, setShake] = useState<string | null>(null);

  if (!currentQuestion || !choices) {
    return null;
  }

  return (
    <Layout>
      <QuestionBar
        emoji={currentQuestion}
        setShake={setShake}
      />
      <EasyGrid>
        {choices.map((emoji) => (
          <EmojiCard
            emojiData={emoji}
            key={emoji.name}
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
      </EasyGrid>
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

const EasyGrid = styled(Grid)`
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export default EasyQuiz;
