<template>
  <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="experience">
    <div class="my-auto" id="experience-content">
      <h2 class="mb-5">Experience</h2>
      <ul class="timeline">
        <li>
          <div class="timeline-badge primary">
            <font-awesome-icon :icon="['fas', 'map-marker-alt']" size="1x" />
          </div>
          <div class="timeline-panel">
            <div class="timeline-heading">
              <h3 class="timeline-title">Velocigo Inc</h3>
              <span class="badge p-2 title-heading">Software Developer</span>
              <!-- <h4>Software Developer</h4> -->
              <p>
                <small class="text-primary"
                  ><font-awesome-icon :icon="['fas', 'calendar-alt']" /> 3/2020
                  - present</small
                >
              </p>
            </div>
            <div class="timeline-body">
              <ul style="list-style:square">
                <li>
                  Built of a Web App moving our main client from Microsoft
                  Dynamics NAV 2009 to an intuitive web UI increasing
                  performance, visibility and communication. The backend was
                  supported by Golang and Node.js, implementing a microservices
                  architecture, Microsoft SQL Server, AWS and Angular 9 on the
                  frontend.
                </li>
                <li>
                  Generation on reports using a RESTful architecture that
                  involved extracting metadata from statistics to present to the
                  final user in dynamic charts, tables and forms.
                </li>
                <li>
                  Guidance of our Junior Developer, supporting him and teaching
                  him the best practices of the profession.
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <div class="timeline-badge primary">
            <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
          </div>
          <div class="timeline-panel">
            <div class="timeline-heading">
              <h3 class="timeline-title">TPV.com</h3>
              <span class="badge p-2 title-heading">Web Developer</span>
              <!-- <h4>Web Developer</h4> -->
              <p>
                <small class="text-primary"
                  ><font-awesome-icon :icon="['fas', 'calendar-alt']" /> 2/2019
                  – 3/2020</small
                >
              </p>
            </div>
            <div class="timeline-body">
              <ul style="list-style:square">
                <li>
                  Converted a big percentage of two major platforms from PHP
                  (Laravel) to Vue.js increasing the loading speed for customers
                  satisfaction.
                </li>
                <li>
                  Built reports, RESTful web services and APIs for Developers,
                  HR personal and other departments of the company involving
                  diverse technologies.
                </li>
                <li>
                  Supporting new features, bug fix and providing a fast solution
                  to issues with more than 1550 contributions on GitHub.
                </li>
                <li>
                  Was one of the key figures in the Internationalization and
                  Localization process of one of the major platforms in the
                  company.
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <div class="timeline-badge primary">
            <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
          </div>
          <div class="timeline-panel">
            <div class="timeline-heading">
              <h3 class="timeline-title">
                Institute of Cybernetics, Mathematics and Physics
              </h3>
              <span class="badge p-2 title-heading"
                >Web Developer / Webmaster</span
              >
              <!-- <h4>Web Developer / Webmaster</h4> -->
              <p>
                <small class="text-primary"
                  ><font-awesome-icon :icon="['fas', 'calendar-alt']" /> 9/2010
                  – 6/2017</small
                >
              </p>
            </div>
            <div class="timeline-body">
              <ul style="list-style:square">
                <li>Website management, frontend and backend</li>
                <li>Development of a PHP modular CMS</li>
                <li>Promptly resolve customer service issues and requests</li>
                <li>
                  Development and maintenance of WordPress themes and plugins
                </li>
                <li>
                  Intranet management of services including chats and data entry
                  interfaces
                </li>
                <li>Web service development following OWASP standards</li>
                <li>
                  Intranet management of services including chats and data entry
                  interfaces
                </li>
                <li>
                  APIs development to track process as part of a CRM
                </li>
                <li>
                  Train end users and technical support personnel on
                  optimization and use of services and programs
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<style scoped>
.timeline {
  list-style: none;
  padding: 0 0 20px;
  position: relative;
  margin-top: -15px;
}
.timeline:before {
  top: 30px;
  bottom: 25px;
  position: absolute;
  content: "";
  width: 3px;
  background-color: #f2b357;
  left: 25px;
  margin-right: -1.5px;
}
.timeline > li,
.timeline > li > .timeline-panel {
  margin-bottom: 5px;
  position: relative;
}
.timeline > li:after,
.timeline > li:before {
  content: "";
  display: table;
}
.timeline > li:after {
  clear: both;
}
.timeline > li > .timeline-panel {
  margin-left: 55px;
  float: left;
  top: 19px;
  padding: 4px 0px 8px 15px;
  /* border: 1px solid #ccc; */
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  /* width: 78vw; */
  width: 95%;
}

@media screen and (min-width: 400px) {
  .timeline > li > .timeline-panel {
    width: 85%;
  }
}

@media screen and (min-width: 800px) {
  .timeline > li > .timeline-panel {
    width: 95%;
  }
}

.timeline > li > .timeline-badge {
  color: #fff;
  width: 36px;
  height: 36px;
  line-height: 36px;
  font-size: 1.2em;
  text-align: center;
  position: absolute;
  top: 26px;
  left: 9px;
  margin-right: -25px;
  background-color: #fff;
  z-index: 100;
  border-radius: 50%;
  /* border: 1px solid #d4d4d4; */
}
.timeline > li.timeline-inverted > .timeline-panel {
  float: left;
}
.timeline > li.timeline-inverted > .timeline-panel:before {
  border-right-width: 0;
  border-left-width: 15px;
  right: -15px;
  left: auto;
}
.timeline > li.timeline-inverted > .timeline-panel:after {
  border-right-width: 0;
  border-left-width: 14px;
  right: -14px;
  left: auto;
}
.timeline-badge.primary {
  background-color: #f2b357 !important;
}
.timeline-badge.success {
  background-color: #3f903f !important;
}
.timeline-badge.warning {
  background-color: #f0ad4e !important;
}
.timeline-badge.danger {
  background-color: #d9534f !important;
}
.timeline-badge.info {
  background-color: #5bc0de !important;
}
.timeline-title {
  margin-top: 0;
  color: #343a40;
}
.timeline-body > p,
.timeline-body > ul {
  margin-bottom: 0;
  margin-top: 0;
}
.timeline-body > p + p {
  margin-top: 5px;
}
.timeline-body > h4 {
  margin-bottom: 0 !important;
}

.title-heading {
  background-color: #f2b357;
  color: #212529;
  font-size: 1.5rem;
  font-family: "Saira Extra Condensed", serif;
  font-weight: 700;
}
</style>
