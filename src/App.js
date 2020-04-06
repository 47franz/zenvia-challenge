import React from "react";
import {
  Jumbotron,
  Container,
  Row,
  Col,
  CardColumns,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

class List extends React.Component {
  state = {
    characters: [],
    loading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      await fetch("https://www.breakingbadapi.com/api/characters")
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            characters: res,
          });
        });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false, error });
    }
  }

  render() {
    if (this.state.loading) return "Carregando...";
    if (this.state.error)
      return "Algo deu Errado, por favor tente novamente mais tarde.";
    return (
      <div>
        <Container>
          <Col>
            <Row>
              <Jumbotron>
                <h1>Lista de Personagens de Breaking Bad</h1>
                <p>Teste realizado por William Franz.</p>
              </Jumbotron>
            </Row>
          </Col>
          <CardColumns>
            {this.state.characters.map((item) => (
              <Card key={item.char_id.toString()}>
                <Card.Img
                  variant="top"
                  src={item.img}
                  style={{ width: "18rem" }}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Nickname: {item.nickname}</ListGroupItem>
                    <ListGroupItem>
                      Data de Nascimento: {item.birthday}
                    </ListGroupItem>
                    <ListGroupItem>
                      Interpretado(a) por: {item.portrayed}
                    </ListGroupItem>
                    <ListGroupItem>
                      Ocupações:
                      {item.occupation.map(
                        (occupation) => " " + occupation + "; "
                      )}
                    </ListGroupItem>
                    <ListGroupItem>
                      Aparições (Temp.):
                      {item.appearance.map(
                        (appearance) => " " + appearance + "; "
                      )}
                    </ListGroupItem>
                    <ListGroupItem>
                      Aparições em Better Caul Saul (Temp.):
                      {item.better_call_saul_appearance.map(
                        (appearance) => " " + appearance + "; "
                      )}
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            ))}
          </CardColumns>
        </Container>
      </div>
    );
  }
}

export default List;
