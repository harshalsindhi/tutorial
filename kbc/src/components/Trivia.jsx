import { useEffect, useState } from "react";
import useSound from 'use-sound';
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wait from "../sounds/wait.mp3";
import wrong from "../sounds/wrong.mp3";

function Trivia({
  questionNumber,
  timeOut,
  setTimeOut,
  data,
  setQuestionNumber,
  setEarned,
  moneyPyramid,
}) {
  const [letsPlay] = useSound(play);
  const [wrongAnswer] = useSound(wrong);
  const [corrctAnswer] = useSound(correct);
  const [waitAnswer] = useSound(wait);

  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [classname, setClassname] = useState("answer");
  const [status,setStatus]=useState(true);
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);
  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassname("answer active");
    delay(3000, () =>
      setClassname(a.correct ? "answer correct" : "answer wrong")
    );
    delay(5000,()=>{
      if(a.correct){
       corrctAnswer();
      }else{
        wrongAnswer();
      }

    })
    delay(11000, () => {
      
      a.correct ? setQuestionNumber((prev) => prev + 1): setStatus(false);
      setTimeout(()=>{
          if(!status){
            setTimeOut(true);
          }
      },3000)
      setEarned(moneyPyramid.reverse()[questionNumber - 2].amount);
      setSelectedAnswer(null);
    });
    // setTimeout(()=>{
    //   //console.log("decide which class been executed");
    // setClassname(a.correct?"answer correct":"answer wrong");

    // },3000);
  };
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);

    
  };
  useEffect(() => {
    letsPlay();
  }, [letsPlay,questionNumber]);
  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a, i) => (
          <div
            className={a == selectedAnswer ? classname : a.correct&&(!status)?"answer correct":"answer"} 
            key={i}
            
            onClick={() => {
              handleClick(a);
            }}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trivia;
