# Microservice Architecture

## What is Microservice Architecture

Microservice architecture is a way of developing an application where the functionalities are broken up into small services. This is like the ***Single Responsibility Principle***, where things that do one thing are bunched together. Like that, an application might do different things. So, we identify the fundamental services or concepts that do one or the same thing, then build and compose them together to form an application.

## Basic Nature of Microservices

So first the services are recognized. Usually, a development team is assigned one microservice. There is no standard for how big the team should be. Like Amazon's *Two Pizza Rule* a team can consist of 12 programmers responsible for a single service or 12 programmers can be responsible for 12 different microservices.

The teams are often cross-functional or in other words, they are built around business capability. So a team can have UI/UX engineers, front-end devs, back-end devs, DevOps, and other collaborators.

After the division, each microservices are essentially built like a black box. They have their own implementation and database. Implementation details are hidden away and only some basic endpoints or functions are exposed to the outside. Then through a messaging service or rest API, each microservice is connected to form a complete application.

The connection is often kept dumb. Meaning they carry only data from one microservice to another. They do not have inner knowledge of how any of them work. This helps to keep the messaging service clean. Wherein a service-oriented model the ESB contains domain-specific code and may become a large point of failure.

After integration and tests. Microservices go through an automated deployment.

## Microservices Benefits

- Because of the de-coupled nature, it is failure resistant. If one service goes down the entire application is not brought down with it. So its failure resistant.

- The use of multiple languages and databases becomes easier. Each microservice can be built according to its own need. No one size fits all implementation.

- It's evolutionary. It is easy to build a new implementation or modification of a microservice without adding downtime or too much overhead.

- Easier to scale as new microservices can be added without affecting the application. It becomes easy to add features to an existing project.

- Better automated deployment and integration with dockers and containers.

- Easier onboarding of devs. As each team is only accountable for one microservice.

## Microservices Disadvantages

- This architecture pattern also adds some overhead as different teams are dealing with different parts. Good documentations are a must-have for  microservices.
  
- Testing becomes a problem as it is hard to test all these different parts together.
  
- Because of the distributed nature of microservices. Its hard to manage them. as, it adds the added complexity of managing multiple databases and composing all these services together.
  
- Inconsistency is also a big concern as separate services might be needed to ensure a single action.  So until the update has gone through all the services. The system will be in a inconsistent state.
  
- Performance is also hampered as different micro service needs to response and act

## Use Cases

This architecture pattern is not suited for all kinds of applications. Especially if the application is small, does not have many moving parts, or does one thing. It will be better to keep the application a monolith that way as it will be easier to manage the codebase. Devs don't have to worry about multiple databases or microservices. Also if the dev team is small it might be better to keep the application a monolith. As the dev team might not have the manpower from different fields to develop microservice on their own in smaller teams.

Microservice architecture shines when we have a relatively complex application with many moving parts, complexity, and scope Then we can divide the app into smaller parts of services and develop them. Also it is helpful when building application utilizing different technology stack.

## Sources

- [Microservices](https://martinfowler.com/articles/microservices.html, "martinfowler.com")
- [Microservice Trade-Offs](https://martinfowler.com/articles/microservice-trade-offs.html, "martinfowler.com")
- [The What, Why, and How of a Microservices Architecture](https://medium.com/hashmapinc/the-what-why-and-how-of-a-microservices-architecture-4179579423a9)
- [How Microservices Architecture Helps Businesses](https://www.cleo.com/blog/microservices-architecture)
- [Microservices Architecture Explained](https://hazelcast.com/glossary/microservices-architecture/)
