## Inversion of Control Containers and the Dependency Injection Pattern
Source: Martin Fowler
In the Java community there's been a rush of lightweight containers that help to assemble components from different projects into a cohesive application.
Underlying these containers is a common pattern to how they perform the wiring, a concept they refer under the very generic name of "Inversion of Control";
In this article the more specific name of "Dependency Injection", and contrast it with the Service Locator alternative.
The choice between them is less important than the principle of separating configuration from use.

One of the entertaining things about the enterprise java world is the huge amount of activity in building alternatives to the mainstream J2EE technologies, much of it happening in open source.
A lot of this is a reaction to the heavyweight complexity in the mainstream J2EE world, but much of it is also exploring alternatives and coming up with creative ideas.
A common issue to deal with is how to wire together different elements: how do you fit together this web controller architecture with that database interface backing when they were built by different teams with little knowledge of each other.
A number of frameworks have taken a stab at this problem, and several are branching out to provide a general capability to assemble components from different layers.
These are often referred to as lightweight containers, examples include PicoContainer, and Spring.

Underlying these containers are a number of interesting design principles, things that go beyond both these specific containers and indeed the Java platform.
Here I want to start exploring some of these principles.

## Components and Services
The topic of wiring elements together drags me almost immediately into the knotty terminology problems that surround the terms service and component.
You find long and contradictory articles on the definition of these things with ease.

I use component to mean a glob of software that's intended to be used, without change, by an application that is out of control of the writers of the component.
By 'without change' I mean that the using applicaiton doesn't change the source code of hte components, although they may alter the component's behavior by extending it in ways allowed by the component writers.

A service is similar to a component in that it's used by foreign applicaitons. The main difference is that I expect a component to be used locally (think jar file, assembly, dll, or a source import);
A service will be used remotely through some remote interface, either synchronous or asynchronous (eg web service, messaging system, RPC, or socket);

## A Naive Example
In this example I am writing a component that provides a list of movies directed by a particular director.
This stunningly useful function is implemented by a single method.
```
class MovieLister...
    public Movie[] moviesDirectedBy(String arg) {
        List allMovies = finder.findAll();
        for (Iterator it = allMovies.iterator(); it.hasNext();) {
            Movie movie = (Movie) it.next();
            if (!movie.getDirector().equals(arg)) it.remove();
        }
        return (Movie[]) allMovies.toArray(new Movie[allMovies.size()]);
    }

```
This function asks a finder object (which we will get to in a moment) to return every film it knows about. Then it just hunts through this list to return those directed by a particular director.

The real point of this article is this finder object, or particularly how we connect the lister object with a particular finder object.
The reason why this is interesting is that I want my wonderful moviesDirectedBy method to be completely independent of how all the movies are being stored.
I can bring this out by defining an interface for the finder.
```
public interface MovieFinder{
    List findAll();
}
```
Now all of this is very well decoupled. But at some point I have to come up with a concrete class to actually come up with the movies.
In this case I put the code for this in the constructor of my lister class.
```
class MovieLister..
    private MovieFinder finder;
    public MovieLister() {
        finder = new ColonDelimitedMovieFinder("movies1.txt");
    }
 ```
Now if I am using this class for just myself, this is all fine and dandy.
But what happens when my friends are overwhelmed by a desire for this wonderful functionality and would like a copy of my program?
What if they have a completely different form of storing their movie listing: a SQL database, an XML file, a web service, or just another format of text file?
Now because I've defined a MovieFinder interface, this won't alter my moviesDirectedBy method. But I still need to have some way to get an instance of the right finder implentation into place.
