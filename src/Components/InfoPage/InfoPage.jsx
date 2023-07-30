import React from "react";
import "./InfoPage.css";

const InfoPage = () => {
  return (
    <div className="info-page-container">
      <h1>About this Project</h1>

      <h2>Purpose</h2>
      <p>
        The goal of this project is to provide students, or anyone else who is
        interested in data structures, with the best tool to learn about the
        functionality and algorithms of tree structures.
      </p>

      <h2>Development</h2>

      <p>
        This project is part of a Bachelor Thesis at the{" "}
        <a href="https://www.uibk.ac.at/">University of Innsbruck</a>
        <br />
      </p>

      <div className="development-section">
        <p>is being developed by:</p>
        <p>
          Matteo Gläser
          <br />
          <a href="mailto:matteo.glaeser@student.uibk.ac.at">
            matteo.glaeser@student.uibk.ac.at
          </a>
          <br />
          <a href="mailto:glaeser.matteo@googlemail.com">
            glaeser.matteo@googlemail.com
          </a>
          <br />
        </p>
        <p>
          under the supervision of:
          <br />
        </p>
        <p>
          Manfred Moosleitner
          <br />
          <a href="mailto:manfred.moosleitner@uibk.ac.at">
            manfred.moosleitner@uibk.ac.at
          </a>
          <br />
        </p>
      </div>
      <p>
        Project Github:{" "}
        <a href="https://github.com/mattik01/Tree-Visualizer">
          https://github.com/mattik01/Tree-Visualizer
        </a>
      </p>

      <h2>What's Coming Next ?</h2>
      <div className="upcoming-section">
        <ul>
          <li>
            Step-by-step "animated" walkthrough of B-Tree all operations (very
            very arduous)
          </li>
          <li>
            Window displaying some interesting tree properties (medium to low
            arduous)
          </li>
          <li>Info/Explanation Section for the B-Tree (medium arduous)</li>
          <li>Compact Mode Display for the B-Tree (very arduous)</li>
          <li>Optional Range for all key generation (low arduous)</li>
          <li>Minimizable UI components (? arduous)</li>
        </ul>
      </div>
    </div>
  );
};

export default InfoPage;