// import * as c from '@reach-sh/simulator-client';
var c = await import('@reach-sh/simulator-client');

const consensusID = -1
const nwToken = -1

Object.filter = (obj, predicate) =>
  Object.fromEntries(Object.entries(obj).filter(predicate));


class Scenario {
  constructor() {
    this.stateID = 0
    this.participants = [];
    this.consensus = new Consensus(new Account(-1));
    this.apis = [];
    this.views = [];
  }

  async init() {
    // reset server
    await c.resetServer()
    // load the Reach program
    const rsh = await c.load()
    // initialize the program for the Consensus
    await c.init()
    const apis = await c.getAPIs()
    const views = await c.getViews(this.stateID)
    const l = await c.getStateLocals(this.stateID)

    // setup parts
    for (const [k,v] of Object.entries(r.l_locals)) {
      const who = v.l_who ? v.l_who : 'Consensus'
      const acc = new Account(v.l_acct)
      if (who) {
        const p = new Participant(k,acc,who)
        this.participants.push(p)
      }
    }

    // setup apis
    for (const [k,v] of Object.entries(apis)) {
      const who = v.a_name
      const a = new API(k,who)
      this.apis.push(a)
    }

    // setup views
    for (const [k,v] of Object.entries(views)) {
      const who = v.a_name
      const vari = v.v_var
      const tag = v.v_ty.tag
      const contents = v.v_ty.contents
      const v = new View(k,who,vari,tag,contents)
      this.views.push(v)
    }
  }

  async pingServer() {
    return await c.ping();
  }

  async reset() {
    return await c.resetServer();
  }

  async programHistory() {
    return await c.getStates();
  }

  async getCurrentActor() {
    const l = await c.getStateLocals(this.stateID)
    if (l.l_curr_actor_id === consensusID) {
      return this.consensus
    } else {
      return this.participants[l.l_curr_actor_id]
    }
  }

  async newAccount() {
    return await c.newAccount(this.stateID);
  }

  async newToken() {
    return await c.newToken(this.stateID);
  }
}

class Participant {
  constructor(id,account,name) {
    this.id = id;
    this.account = account;
    this.name = name
  }

  async history() {
    const sg = await c.getStateGraph();
    const filtered = Object.filter(sg, ([id, state]) =>
      state[1].contents.l_curr_actor_id === this.id
    );
    return filtered;
  }

  async getNextInteract() {
    return this.id;
  }

  async getStore() {
    const l = await c.getStateLocals(this.stateID)
    return l.locals[this.id].l_store
  }

  async getPhase() {
    const l = await c.getStateLocals(this.stateID)
    return l.locals[this.id].l_phase

  }
}

class Consensus {
  constructor(account) {
    this.account = account;
  }

  async transfer() {
    return this.id;
  }

  async history() {
    return this.id;
  }

  async getNextTiebreak() {
    return this.id;
  }

  async getNextRemote() {
    return this.id;
  }

  async getLedger() {
    return this.id;
  }

  async getLinearState() {
    return this.id;
  }

  async getNetworkTime() {
    return this.id;
  }

  async getNetworkSeconds() {
    return this.id;
  }

  async getLog() {
    return this.id;
  }

  async getPhase() {
    return this.id;
  }

}

class Action {
  constructor(id,name,owner) {
    this.id = id;
    this.name = name;
    this.owner = owner;
  }

  async resolve() {
    return this.id;
  }

}

class Account {
  constructor(id) {
    this.id = id;
  }

  async getWallet() {
    return this.id;
  }
}

class Token {
  constructor(id) {
    this.id = id;
  }
}

class View {
  constructor(id,name,vari,tag,contents) {
    this.id = id;
    this.name = name;
    this.vari = vari;
    this.tag = tag;
    this.contents = contents;
  }

  async call() {
    return this.id;
  }
}

class API {
  constructor(id,name) {
    this.id = id;
    this.name = name;
  }

  async call() {
    return this.id;
  }
}