import React from 'react';
import logo from '../assets/img/logo.svg'
import ceoImage from '../assets/img/lmaquin.jpg';
import adminImage from '../assets/img/egomez.png';
import inspectorImage from '../assets/img/dsiney.png';
import managerImage from '../assets/img/pmedina.jpeg';
import coordinatorImage from '../assets/img/msuyen.jpg';

export const Home = () => {
  return (
    <div className="home-container">
      <section className="introduction">
        <img src={logo} alt="Soul Bistro" />
        <p>
          Sumérgete en una experiencia única y exclusiva en Soul Bistro, donde puedes encontrar habitaciones y eventos en los mejores hoteles. Descubre la combinación perfecta de lujo, comodidad y elegancia.
        </p>
      </section>

      <section className="about">
        <h2>Acerca de Soul Bistro</h2>
        <p>
          Soul Bistro es una plataforma líder en la industria hotelera que ofrece una amplia gama de opciones para apartar habitaciones y eventos en los hoteles más exclusivos de todo el mundo. Nuestro equipo está comprometido con brindarte la mejor experiencia de reserva y asegurarte unas vacaciones inolvidables.
        </p>
        <div className="employees">
          <h3>Nuestro Equipo</h3>
          <div className="ceo">
            <img src={ceoImage} alt="Luciano Maquin - CEO" />
            <p>Luciano Maquin · CEO</p>
          </div>
          <div className="employee-pair">
            <div className="employee">
              <img src={adminImage} alt="Esteban Gómez - Administrador de Hoteles" />
              <p>Esteban Gómez · Administrador de Hoteles</p>
            </div>
            <div className="employee">
              <img src={inspectorImage} alt="Diego Siney - Inspector de Habitaciones" />
              <p>Diego Siney · Inspector de Habitaciones</p>
            </div>
          </div>
          <div className="employee-pair">
            <div className="employee">
              <img src={managerImage} alt="Pedro Medina - Gerente de Servicio al Cliente" />
              <p>Pedro Medina · Gerente de Servicio al Cliente</p>
            </div>
            <div className="employee">
              <img src={coordinatorImage} alt="Mario Suyén - Coordinador de Eventos" />
              <p>Mario Suyén · Coordinador de Eventos</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Soul Bistro. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
