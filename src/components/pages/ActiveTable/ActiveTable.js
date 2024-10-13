import CustomButton from "../../common/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTableById, updateTablesRequest } from "../../../redux/tablesRedux";
import { Container, Form, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

const ActiveTable = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const activeTable = useSelector(state => getTableById(state, id));
  // console.log(activeTable)
  const dispatch = useDispatch();
  
  const [status, setStatus] = useState(activeTable.status);
  const [peopleAmount, setPeopleAmount] = useState(activeTable.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(activeTable.maxPeopleAmount);
  const [bill, setBill] = useState(activeTable.bill);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeTable) {
      navigate('/');
    }
  }, [activeTable, navigate]);

  useEffect(() => {
    if (status === 'Free' || status === 'Cleaning') {
      setPeopleAmount(0);
    }
    if (status !== 'Busy') {
      setBill(0);
    }
  }, [status, setPeopleAmount]);

  const handlePeopleAmount = value => {
    setPeopleAmount(value > maxPeopleAmount ? maxPeopleAmount : Math.max(0, Math.min(value, 10)));
  }

  const handleMaxPeopleAmount = value => {
    setMaxPeopleAmount(Math.max(0, Math.min(value, 10)));
    if (peopleAmount > value) {
      setPeopleAmount(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTable = {
      id: activeTable.id,
      status,
      peopleAmount: peopleAmount > maxPeopleAmount ? maxPeopleAmount : peopleAmount,
      bill: status === 'Busy' ? bill : 0,
    }
    setLoading(true);
    setTimeout(() => {
      dispatch(updateTablesRequest(updatedTable));
      setLoading(false);
      navigate('/');
    }, 1000);
  };

    if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary"/>
        <p>Updating...</p>
      </div>
    );
  }

  return (
    <Container>
      <h1>Table {activeTable.id}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="d-flex align-items-center my-3" controlId="status">
          <Form.Label className="me-3"><strong>Status:</strong></Form.Label>
          <Form.Select value={status} style={{ maxWidth: 500 }} onChange={e => setStatus(e.target.value)}>
            <option value="Free">Free</option>
            <option value="Reserved">Reserved</option>
            <option value="Busy">Busy</option>
            <option value="Cleaning">Cleaning</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="d-flex align-items-center mb-3" controlId="people">
          <Form.Label className="me-3"><strong>People:</strong></Form.Label>
          <div className="d-flex align-items-center">
            <Form.Control value={ peopleAmount } style={{ maxWidth: 100 }} type="number" disabled={status === 'Free' || status === 'Cleaning'} onChange={e => handlePeopleAmount(e.target.value)}></Form.Control>
            <span className="mx-2">/</span>
            <Form.Control value={ maxPeopleAmount} style={{ maxWidth: 100 }} type="number" max={10} onChange={e => handleMaxPeopleAmount(e.target.value)}></Form.Control>
          </div>
        </Form.Group>

        <Form.Group className="d-flex align-items-center mb-3" controlId="bill">
          <Form.Label className="me-3"><strong>Bill:</strong></Form.Label>
          <span className="mx-2">$</span>
          <Form.Control value={ bill } style={{ maxWidth: 100 }} type="number" onChange={e => setBill(e.target.value)}></Form.Control>
        </Form.Group>

        <CustomButton type="submit">Update</CustomButton>

      </Form>
    </Container>
  )
}

export default ActiveTable;
