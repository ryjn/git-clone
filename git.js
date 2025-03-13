function Git(name) {
  /**
    * Git class, represents a repo
    * > git init
    *
    * @param { string } name: repo name
    * @returns {}
    */
  this.name = name; // Repo name
  this.lastCommitId = -1; // keep track of last commit id
  // this.HEAD = null; // Reference to last commit. Updated everytime commit is made
  var master = new Branch("master", null); // default Master branch. Null passed as no commits made yet
  this.HEAD = master // HEAD points to current branch
}

function Commit(id, parent, message) {
  /**
    * Commit class
    * 
    * @param { number } id: commit id
    */
  this.id = id;
  // Commits are stored as linked list. Each commit points to its parent commit
  this.parent = parent; // store parent commit
  this.message = message; // commit message
}

Git.prototype.commit = function (message) {
  /**
    * Creates new Commit isntance and returnts it
    * > git commit -m "message"
    *
    * @params { string } message
    * @returns { Commit }
    */
  var commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);  // increment CommitId with each new commit
  // Update current branch pointer to new commit
  this.HEAD.commit = commit;
  console.log(`commit message: ${message}`);
  return commit;
};

Git.prototype.checkout = function (branchName) {
  /**
    * Switch to branchName or create new branch if DNE
    * 
    * @params { string } branchName: branch name to switch to or create
    */
  // Loop through all branches to check if 'branchName' exists
  
}
Git.prototype.log = function () {
  // Start from HEAD
  var commit = this.HEAD.commit,
    history = []; // array of commits in reverse order
  while (commit) {
    history.push(commit);
    commit = commit.parent;
  }
  return history;
};

function Branch(name, commit) {
  /**
    * Create new Branch
    *
    * @params { string } name: name of branch
    * @pararms { Commit } commit: reference to some commit
    */
  this.name = name;
  this.commit = commit;
};

// Test 1 - git log
console.log('Git.log() test')
var repo = new Git("test");
repo.commit("Initial commit");
repo.commit("Change 1");

var log = repo.log();
console.assert(log.length === 2);   // Should have 2 commits
console.assert(!!log[0] && log[0].id === 1);  // Commit 1 should be first
console.assert(!!log[1] && log[1].id === 0);  // and then commit 0

// Test 2 - git checkout
console.log("Git.checkout() test")
var repo = new Git("test")
repo.commit("Initial commit")

console.assert(repo.HEAD.name === "master"); // Should be on master branch
repo.checkout("testing");
console.assert(repo.HEAD.name ==== "testing"); // Should be on new testing branch
repo.checkout("master");
console.assert(repo.HEAD.name === "master"); // Should be back on master
repo.checkout("testing");
console.assert(repo.HEAD.name === "testing"); // Should be back on testing
