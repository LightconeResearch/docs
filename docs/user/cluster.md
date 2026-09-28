# Compute and clusters

Use the same workflow on your workstation and on Slurm: launch an allocation,
run your project on its cluster ID, and release it when you finish. `lc status`
and `lc materialize --check` inspect the project without allocating compute.

These commands use the development version in the [installation guide](install.md).

## Start locally

Run these commands from a prepared project's root. Without a compute catalog,
Lightcone offers one local CPU and 1 GiB of memory for 30 minutes. You can request
up to two hours with `--time 2h`.

```bash
lc compute resources
lc compute launch --cpus 1 --memory 1
```

Copy the cluster ID printed by `launch` and assign it to `CLUSTER`:

```bash
CLUSTER=PASTE_CLUSTER_ID_HERE
lc compute status "$CLUSTER" --wait
lc run "$CLUSTER" -- python -c 'print("hello from the cluster")'
lc materialize "$CLUSTER"
lc compute down "$CLUSTER"
```

Launch returns when the allocation is accepted; `status --wait` waits until its
workers are ready. Finishing a run leaves the allocation available for another
command. `down` requests termination; the allocation also has a time limit.
Local CPU and memory settings are cooperative limits, rather than an exclusive
reservation of your workstation's hardware.

For scripts, capture the versioned JSON report instead of copying the ID:

```bash
CLUSTER=$(lc compute launch --cpus 1 --memory 1 --json | uv run python -c 'import json,sys; print(json.load(sys.stdin)["id"])')
```

## Request more resources

`lc compute resources` lists the configured offers. CPU and memory quantities
are **per node**, with memory in **GiB**. Bare numbers request an exact match;
a `+` suffix accepts a larger offer. The first eligible offer wins.

```bash
lc compute launch --cpus 4+ --memory 8+ --time 1h --dry-run
```

`--dry-run` shows the selected offer and launch parameters without allocating.
A real launch requires an offer that can satisfy your request; the built-in
one-CPU offer cannot satisfy this larger example. `--num-nodes` defaults to one.
`--startup fast` selects a service class, without guaranteeing a queue time.

## Customize resource offers

Create `~/lightcone-compute.yaml` to replace the built-in offer. This example
exposes a four-CPU local allocation:

```yaml
version: 1
connections:
  workstation:
    namespace: 22c84e48-2f0a-4cd2-90a2-30ce2e909bd1
    provider: local
offers:
  - name: workstation
    connection: workstation
    resources: {cpus: 4, memory: 8}
    max_nodes: 1
    time: {default: 30m, max: 2h}
    startup: {class: fast}
```

The namespace is a stable UUID identifying the connection. Keep it unchanged
while its clusters exist. A catalog replaces the default completely; stop any
built-in allocation before replacing its connection.

Set `LC_COMPUTE_CONFIG` to use another file for both compute and execution:

```bash
export LC_COMPUTE_CONFIG="$HOME/my-compute.yaml"
lc compute resources
```

The compute group's `--config PATH` overrides this for a single invocation.
A missing explicitly selected file is an error. Only the absent default file
enables the built-in offer.

## Configure Slurm

Slurm setup depends on your facility. The submitting machine needs native
Slurm commands and permission to use the requested account and service.
The project and the Lightcone installation must be accessible to the workers.

The following is an illustrative catalog, not a tested deployment recipe.
Replace the paths, account, partition, and resource shape with values for your
facility. The `python` path must point to an environment containing the same
Lightcone and Dask versions as the submitting client.

```yaml
version: 1
connections:
  hpc:
    namespace: 9d0c0fc5-9be8-407a-a3ec-f17c4110b162
    provider: slurm
    launch:
      python: /shared/tools/lightcone/bin/python
      connection_root: /shared/home/alice/.lightcone/compute
      scratch_root: /shared/scratch/alice/lightcone
      task_slots_per_node: 30
      cpu_bind: threads
offers:
  - name: batch
    connection: hpc
    resources: {cpus: 32, memory: 128}
    max_nodes: 4
    time: {default: 1h, max: 12h}
    startup: {class: batch}
    config:
      submit: sbatch
      account: myproject
      partition: compute
```

Then inspect and launch the allocation:

```bash
lc compute launch --cpus 32 --memory 128 --num-nodes 2 --time 1h --dry-run
lc compute launch --cpus 32 --memory 128 --num-nodes 2 --time 1h
```

Use its returned ID with the same `status --wait`, `materialize`, and `down`
commands as the local example. You do not wrap materialization in `salloc`
or `sbatch`; the compute provider submits the allocation.

A connection can set `context` to a native Slurm cluster name. Offers can use
`submit: salloc` with site-specific QOS or constraints for interactive services.
Their lifetime across logout or session cleanup needs checking at your site.
Batch submissions are independent of the invoking CLI.

Check the resolved partition and walltime policy during deployment. Planning
freezes a partition and rejects unlimited overrun policies; site routing based
on QOS may need explicit configuration. Task concurrency is controlled by
`task_slots_per_node`; the scheduler also consumes allocation resources.

## Execution requirements and limits

- The driver and workers need the project, prepared environment, and inputs at
  the **same absolute paths**, with matching Lightcone, Python major/minor, and
  Dask versions. Relaunch compute after changing the worker installation.
- Containerized projects need their prepared image and runtime on every worker.
- Commands receive EOF on stdin. Direct commands inherit the workers' allocation
  environment; variables added to the invoking shell after launch are not
  forwarded. Use `lc run "$CLUSTER" -- env NAME=value python script.py` for a
  command-specific value.
- Use one execution invocation per project at a time. An interrupted client may
  leave recipes running; stop the allocation and confirm the work has stopped
  before repairing partial outputs. Local containers managed by an external
  runtime may also need stopping through that runtime.

A failed or uncertain submission is not automatically retried on another offer.
If an error includes a submission token, inspect `lc compute status` and the
native scheduler before retrying; the allocation may already exist. Keep the
connection in your catalog while you need to inspect or terminate its clusters.

The [compute reference](../cli/compute.md) lists all options and status fields.
