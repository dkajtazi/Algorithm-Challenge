const lib = require("./algorithm");
const Graph = lib.Graph;
const Node = lib.Node;
const Edge = lib.Edge;
const Algorithm = lib.Algorithm;

var graph = new Graph();
graph.addNode(new Node("A"));
graph.addNode(new Node("B"));
graph.addNode(new Node("C"));
graph.addEdge(new Edge("A", "B", 8));
graph.addEdge(new Edge("A", "C", 1));
graph.addEdge(new Edge("C", "B", 2));

var algo = new Algorithm(graph, "A");
algo.execute();
graph.print();