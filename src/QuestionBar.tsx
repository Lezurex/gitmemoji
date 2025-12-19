import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "./Button";
import { EmojiData } from "./EmojiData";

interface QuestionBarProps {
  emoji: EmojiData;
  setShake: React.Dispatch<React.SetStateAction<string | null>>
}

const QuestionBar: React.FC<QuestionBarProps> = ({
  emoji,
  setShake,
}) => {
  return (
    <Bar>
      <Link to="/" style={{display: "flex"}}>
        <Button icon="⬅️" iconAriaLabel="back">Back</Button>
      </Link>
      <Question>{emoji.description}</Question>
      <Button icon="❓" iconAriaLabel="question mark" onClick={async () => {
        setShake(emoji.name);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setShake(null);
      }}>Show Answer</Button>
    </Bar>
  )
}

const Bar = styled.div`
  box-shadow: 0 1px 2px 0 rgba(168, 182, 191, 0.6);
  padding: 1em 0.5em;
  background-color: #fff;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

const Question = styled.span`
  font-size: 1.3em;
  text-align: center;
  color: #555;
  font-weight: bold;
  flex-grow: 1;
`

export default QuestionBar;