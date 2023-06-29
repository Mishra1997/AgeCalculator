import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineFilterVintage } from "react-icons/md";

const AgeCal = () => {
  const [userYear, SetUserYear] = useState("0");
  const [userMonth, setUserMonth] = useState("0");
  const [userDay, setUserDay] = useState("0");
  const [userVal, setUserVal] = useState(new Date());
  const[isTrue,setIsTrue]=useState(false);
  const[isNull,setIsNull]=useState("m");


  //  User Given Value
  const userInputYears = parseInt(userVal.getFullYear());
  const userInputMonth = parseInt(userVal.getMonth()) + 1;
  const userInputDay = parseInt(userVal.getDate());

  //  Current Date Value
  const presentDate = new Date();
  const presentYears = parseInt(presentDate.getFullYear());
  const presentMonth = parseInt(presentDate.getMonth()) + 1;
  const presentDay = parseInt(presentDate.getDate());

  const getd = (e) => {
    const userGivenDate = e.target.value;
    const userDob = new Date(userGivenDate);
    setUserVal(userDob);
    setIsNull(userGivenDate);
  };

  const getWarningMessageForPastDate = () => {
    toast.info(` It's lovely to see you, but we can't figure out your age. `, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const getWarningMessageForFutureDate = () => {
    toast.info(`Are you born in the future, Jocking? . `, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const findAge = () => {

if(isNull!=="m")
{
  setIsTrue(true)
}

    if (userInputYears < 1905) {
      getWarningMessageForPastDate();
    } else if (userInputYears > presentYears) {
      getWarningMessageForFutureDate();
    } else {
      if (userInputYears === presentYears && userInputMonth > presentMonth) {
        toast.info(`Are you born in the future Month, Jocking? . `, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (
        userInputMonth === presentMonth &&
        userInputDay <= presentDay
      ) {
        calculateAge();
      } else if (userInputMonth < presentMonth) {
        calculateAge();
      } else if (userInputYears < presentYears) {
        calculateAge();
      } else {
        toast.info(`Are you born in the future Date, Jocking?  . `, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const calculateAge = () => {
    let yearAge = presentYears - userInputYears;
    let monthAge;

    if (presentMonth >= userInputMonth) {
      monthAge = presentMonth - userInputMonth;
    } else {
      yearAge--;
      monthAge = 12 + presentMonth - userInputMonth;
    }

    let dateAge;
    if (presentDay >= userInputDay) {
      dateAge = presentDay - userInputDay;
    } else {
      monthAge--;
      dateAge = 31 + presentDay - userInputDay;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    const age = {
      years: yearAge,
      months: monthAge,
      days: dateAge,
    };

    SetUserYear(age.years);
    setUserMonth(age.months);
    setUserDay(age.days);
  };

  return (
    <>
      <Card
        id="Card"
        style={{
          width: "40rem",
          height: "25rem",
          margin: "7% 0 0 25%",
          boxShadow: "8.0px 16.0px 16.0px hsl(90deg 0% 0% / 0.25)",
        }}
      >
        <Card.Body>
          <Card.Title
            style={{ fontSize: "2.5rem", color: "#fccfcf", fontWeight: "bold" }}
          >
            <MdOutlineFilterVintage /> Age Calculator
          </Card.Title>
          <Container fluid>
            <Row className="mt-5">
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Choose Your Date Of Birth</Form.Label>
                  <Form.Control type="date" placeholder="Day" onChange={getd} />
                </Form.Group>
              </Col>
              <Col className="pt-2">
                <Button
                  id="find_btn"
                  className="mt-4"
                  type="submit"
                  style={{
                    width: "16rem",
                    background: "#fccfcf",
                    boxShadow: "8.0px 8.0px 10.0px hsl(0deg 0% 0% / 0.25)",
                    border: "1px solid #fccfcf",
                    fontWeight: "bold",
                  }}
                  onClick={findAge}
                >
                  Find Age
                </Button>
              </Col>
            </Row>

{
  isTrue?
  <div
    className="mt-5"
    style={{
  boxShadow: "8.0px 16.0px 16.0px  #fccfcf",height:"10vh",borderRadius:"10px"
    }}
    // hsl(90deg 0% 0% / 0.25)
  >
    <div style={{ fontSize: "1.6rem",paddingTop:"12px" }}>
      You are {userYear} years , {userMonth} months and {userDay} days
      old
    </div>           
  </div>:null
}

          </Container>
        </Card.Body>
      </Card>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
export default AgeCal;
