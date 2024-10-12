import CustomButton from "../../common/CustomButton";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTableById } from "../../../redux/tablesRedux";
import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";

const ActiveTable = () => {
  
  const { id } = useParams();

  const activeTable = useSelector(state => getTableById(state, id));
  // console.log(activeTable)
  
  const [status, setStatus] = useState(activeTable.status);
  const [peopleAmount, setPeopleAmount] = useState(activeTable.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(activeTable.maxPeopleAmount);
  const [bill, setBill] = useState(activeTable.bill);

  return (
    <Container>
      <h1>Table {activeTable.id}</h1>
      <Form>
        <Form.Group className="d-flex align-items-center my-3" controlId="status">
          <Form.Label className="me-3"><strong>Status:</strong></Form.Label>
          <Form.Select value={status} style={{ maxWidth: 500 }}>
            <option value="Free">Free</option>
            <option value="Reserved">Reserved</option>
            <option value="Busy">Busy</option>
            <option value="Cleaning">Cleaning</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="d-flex align-items-center mb-3" controlId="people">
          <Form.Label className="me-3"><strong>People:</strong></Form.Label>
          <div className="d-flex align-items-center">
            <Form.Control value={ peopleAmount } style={{ maxWidth: 100 }} type="number"></Form.Control>
            <span className="mx-2">/</span>
            <Form.Control value={ maxPeopleAmount} style={{ maxWidth: 100 }} type="number"></Form.Control>
          </div>
        </Form.Group>

        <Form.Group className="d-flex align-items-center mb-3" controlId="bill">
          <Form.Label className="me-3"><strong>Bill:</strong></Form.Label>
          <span className="mx-2">$</span>
          <Form.Control value={ bill } style={{ maxWidth: 100 }} type="number"></Form.Control>
        </Form.Group>

        <CustomButton type="submit">Update</CustomButton>

      </Form>
    </Container>
  )
}

export default ActiveTable;
